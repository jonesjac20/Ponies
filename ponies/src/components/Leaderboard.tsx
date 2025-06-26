import React, { useState } from 'react';
import PlayerComponent from './PlayerComponent';
import type { Player } from '../types';

export default function Leaderboard() {
    const [points, setPoints] = useState<Map<number, number>>(new Map());

    const players: Player[] = [
        { id: 1, first_name: 'John', last_name: 'Doe', rink_name: 'Team A' },
        { id: 2, first_name: 'Jane', last_name: 'Smith', rink_name: 'Team B' },
    ];

    const updatePoints = (playerId: number, newPoints: number) => {
        setPoints((prevPoints) => {
            const updatedPoints = new Map(prevPoints);
            updatedPoints.set(playerId, newPoints);
            return updatedPoints;
        });
    };

    return (
        <div>
            {players.map((player) => (
                <PlayerComponent
                    key={player.id}
                    player={player}
                    points={points}
                    setPoints={updatePoints}
                />
            ))}
        </div>
    );
}