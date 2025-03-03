import React, { useState, useEffect } from 'react';
import readPlayersCSV from './utils/readPlayersCSV';
import Player from './components/player';

function App() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        readPlayersCSV('./data/players.csv')
            .then((data: Player[]) => setPlayers(data))
            .catch((error: Error) => console.error('Error reading CSV file:', error));
    }, []);

    return (
        <div>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                      {player.firstname} {player.lastname} - {player.points}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
