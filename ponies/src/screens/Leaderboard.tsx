import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Player, Race, Team } from '../types';
import SearchBar from '../components/SearchBar';
import TeamContext from '../context/TeamContext';
import PlayerComponent from '../components/PlayerComponent';

export default function Leaderboard() {
    const teamsList = useContext(TeamContext);
    const players = useContext(TeamContext);
    const [foundList, setFoundList] = useState<Player[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const foundList: Player[] = [];
        const value = event.target.value.split(' ').join().toLocaleLowerCase();
        // Searches by first name and last name conjoined and set lowercase.
        for (const p of players) {
            const target = (p.first_name + ' ' + p.last_name).toLocaleLowerCase().split(' ').join();
            for (let i = 0; i < p.first_name.length + p.last_name.length; i++) {
                if (target.substring(i, i + value.length) === value.substring(i, i + value.length)) {
                    foundList.push(p);
                    break;
                }
            }
        }
        // console.log(foundList);
        setFoundList(foundList);
    }

    return (
        <>
            <SearchBar handleSearch={handleSearchInputChange} />
            {/* Display the leaderboard */}
            <div className="board-container">
                <Container fluid id="board">
                    <Row className="flex-row">
                        {foundList.sort((a, b) => b.points - a.points).map((player, index) => (
                            <div key={index}>
                                <Col xs="auto">
                                    {/* Pass the player object to the PlayerComponent */}
                                    <PlayerComponent 
                                        player={player} 
                                    />
                                </Col>
                                <br />
                            </div>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    )
};