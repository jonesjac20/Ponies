import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Player } from '../types';
import SearchBar from '../components/SearchBar';
import TeamContext from '../context/TeamContext';
import PlayerComponent from '../components/PlayerComponent';
import '../styles/App.css'; // Import the shared stylesheet

export default function Leaderboard() {
    const { players: contextPlayers } = useContext(TeamContext);
    const [foundList, setFoundList] = useState<Player[]>([]);

    // Initialize points in local storage if not already set.
    useEffect(() => {
        if (!localStorage.getItem('points')) {
            const initialPoints = Array(128).fill(0); // Initialize with 128 zeros
            localStorage.setItem('points', JSON.stringify(initialPoints));
        }
        setFoundList(contextPlayers);
    }, [contextPlayers]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const foundList: Player[] = [];
        const value = event.target.value.split(' ').join().toLocaleLowerCase();
        for (const p of contextPlayers) {
            const target = (p.first_name + ' ' + p.last_name).toLocaleLowerCase().split(' ').join();
            for (let i = 0; i < p.first_name.length + p.last_name.length; i++) {
                if (target.substring(i, i + value.length) === value.substring(i, i + value.length)) {
                    foundList.push(p);
                    break;
                }
            }
        }
        setFoundList(foundList);
    };

    // Sort players by points in descending order
    const sortedPlayers = [...foundList].sort((a, b) => {
        const points = JSON.parse(localStorage.getItem('points') || '[]');
        const pointsA = points[a.id] || 0;
        const pointsB = points[b.id] || 0;
        return pointsB - pointsA; // Descending order
    });

    return (
        <>
            <SearchBar handleSearch={handleSearchInputChange} />
            <div className="board-container">
                <Container fluid id="board">
                    <Row className="justify-content-center">
                        {sortedPlayers.map((player, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <PlayerComponent player={player} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}