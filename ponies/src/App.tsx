import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';
import PlayerComponent from './components/PlayerComponent';
import { Player, Race, Team } from './types';
import SearchBar from './components/SearchBar';
import "./styles/App.css";

function App() {
    const [players, setPlayers] = useState([] as Player[]);
    const [foundList, setFoundList] = useState<Player[]>([]);

    const [teams, setTeams] = useState(new Map<string, Team>());

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

                        // Create a Map to group players by their rink_name
                        const teamMap = new Map<string, Team>();

                        for (const p of playersWithStoredPoints) {
                            if (!teamMap.has(p.rink_name)) {
                                // If the team doesn't exist, create a new team
                                teamMap.set(p.rink_name, {
                                    id: teamMap.size,
                                    name: p.rink_name,
                                    players: [p],
                                });
                            } else {
                                // If the team exists, add the player to the team's players array
                                teamMap.get(p.rink_name)?.players.push(p);
                            }
                        }

                        // Save the Map instead of converting it to an array
                        setTeams(teamMap);
                        console.log(teamMap);
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
        setFoundList(players);
    }, [players]);

    const updatePlayerPoints = (id: number, points: number) => {
        const newPlayerOrder = players.map(player => player.id === id ? { ...player, points } : player);
        setPlayers(newPlayerOrder);
    };
    
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
        <div className="app-container">
            <h1 className="app-title">Ponies Leaderboard</h1>
            {/* Pass the players state and updatePlayerPoints function to the Controls component */}
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
                                        players={players} 
                                        updatePlayerPoints={updatePlayerPoints} 
                                    />
                                </Col>
                                <br />
                            </div>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
