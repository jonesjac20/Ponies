import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';
import PlayerComponent from './components/PlayerComponent';
import { Player, Team } from './types';
import SearchBar from './components/SearchBar';
import "./styles/App.css";
import TeamContext from './context/TeamContext';
import PoniesTabs from './PoniesTabs';
import { useNavigate } from 'react-router-dom';

function App() {
    const [players, setPlayers] = useState([] as Player[]);
    const [storedPoints, setStoredPoints] = useState(localStorage.getItem('playerPoints') || '{}');
    const [teamsList, setTeams] = useState(new Map<string, Team>());

    // Fetch the CSV file and parse it. The parsed data will be stored in the players state, as well as the teams stored in the teamsList state.
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

    // Initializes storage, if needed.
    useEffect(() => {
        const storedPoints = localStorage.getItem('playerPoints');
        // Initialize local storage to 0. This will be a map of player IDs to points.
        if (!storedPoints) {
            players.map(player => {
                localStorage.setItem('playerPoints', JSON.stringify({ [player.id]: 0 }));
            })
        }
    }, [players]);  

    return (
        <TeamContext.Provider value={teamsList}>
            <PoniesTabs />
        </TeamContext.Provider>
        
    );
}

export default App;
