import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';
import PlayerComponent from './components/PlayerComponent';
import { Player } from './types';
import WinButton from './components/WinButton';
import SearchBar from './components/SearchBar';

function App() {
    const [players, setPlayers] = useState([] as Player[]);

    // Fetch the CSV file and parse it. The parsed data will be stored in the players state.
    useEffect(() => {
        fetch('/data/Players.csv') // Fetch CSV file
            .then(response => {
                // Check the file imported correctly
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(csvData => {
                if (!csvData) {
                    throw new Error("CSV data is empty or undefined.");
                }

                // Parse the data. The players constant will be an array of Player objects after parsing.
                Papa.parse<Player>(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: (result: Papa.ParseResult<Player>) => {
                        const playersWithZeroPoints = result.data.map(player => ({
                            ...player,
                            points: 0
                        }));

                        // Retrieve points from local storage
                        const storedPoints = JSON.parse(localStorage.getItem('playerPoints') || '{}');
                        const playersWithStoredPoints = playersWithZeroPoints.map(player => ({
                            ...player,
                            points: storedPoints[player.id] || 0
                        }));

                        setPlayers(playersWithStoredPoints);
                    }
                });
            })
            .catch(error => {
                console.error("Error loading CSV file:", error);
            });
    }, []);

    // Save points to local storage whenever players state changes
    useEffect(() => {
        const points = players.reduce((acc, player) => {
            acc[player.id] = player.points;
            return acc;
        }, {} as { [key: string]: number });

        localStorage.setItem('playerPoints', JSON.stringify(points));
    }, [players]);

    const updatePlayerPoints = (id: number, points: number) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === id ? { ...player, points } : player
            )
        );
    };

    return (
        <div>
            <h1>Ponies Leaderboard</h1>
            {/* Pass the players state and updatePlayerPoints function to the Controls component */}
            <SearchBar players={players} />
            {/* Display the leaderboard */}
            <div>
                <Container fluid id="board">
                    <Row className="flex-row">
                        {players.sort((a, b) => b.points - a.points).map((player, index) => (
                            <Col key={index} xs="auto">
                                {/* Pass the player object to the PlayerComponent */}
                                <PlayerComponent 
                                    player={player} 
                                    players={players} 
                                    updatePlayerPoints={updatePlayerPoints} 
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
