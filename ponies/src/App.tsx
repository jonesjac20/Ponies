import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PlayerComponent from './components/PlayerComponent';

// Define the Player type
interface Player {
    id: number;
    rink_no: number;
    rink_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    team: string;
    sheet: number;
    points: number;
}

function App() {
    const [players, setPlayers] = useState([] as Player[]);

    // Fetch the CSV file and parse it.
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
    
                console.log("Fetched CSV Data:", csvData); // Debugging: Log CSV content
                
                // Parse the data. The players constant will be an array of Player objects after parsing.
                Papa.parse<Player>(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: (result: Papa.ParseResult<Player>) => {
                        console.log("Parsed CSV Data:", result.data); // Debugging: Log parsed data
                        const playersWithZeroPoints = result.data.map(player => ({
                            ...player,
                            points: 0
                        }));
                        setPlayers(playersWithZeroPoints);
                    }
                });
            })
            .catch(error => {
                console.error("Error loading CSV file:", error);
            });
    }, []);
    

    return (
        <div>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                      {player.first_name} {player.last_name} - {player.points}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
