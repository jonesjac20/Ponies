import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Player } from './types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import TeamContext from './context/TeamContext';
import NavTabs from './PoniesTabs';
import Leaderboard from './screens/Leaderboard'; // Import the Leaderboard component
import Admin from './screens/Admin'; // Import the Admin component

function App() {
    const [players, setPlayers] = useState([] as Player[]);
    const [teamsList, setTeams] = useState(new Map<string, Player[]>());
    
    // Parses data from XML and sets players and teamsList states.
    useEffect(() => {
        fetch('/data/Players.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(csvData => {
                if (!csvData) {
                    throw new Error("CSV data is empty or undefined.");
                }

                Papa.parse<Player>(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: (result: Papa.ParseResult<Player>) => {
                        const res = result.data;
                        setPlayers(res);

                        const teamMap = new Map<string, Player[]>();

                        for (const p of res) {
                            const teamName = p.rink_name;
                            if (!teamMap.has(teamName)) {
                                teamMap.set(teamName, []);
                            }
                            teamMap.get(teamName)?.push(p);
                        }

                        setTeams(teamMap);
                        console.log(teamMap);
                    }
                });
            })
            .catch(error => {
                console.error("Error loading CSV file:", error);
            });
    }, []);

    return (
        <TeamContext.Provider value={{ teamsList, players }}>
            <h1>Playing the Ponies!</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavTabs />}>
                        <Route path="screens/Leaderboard" element={<Leaderboard />} />
                        <Route path="screens/Admin" element={<Admin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TeamContext.Provider>
    );
}

export default App;
