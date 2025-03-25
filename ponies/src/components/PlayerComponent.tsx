import React from 'react';
import '../styles/PlayerComponent.css';
import type { Player } from '../types';
import { Card, CardTitle } from 'react-bootstrap';
import WinButton from './WinButton';

export default function PlayerComponent({
    player,
    players,
    updatePlayerPoints,
}: {
    player: Player;
    players: Player[];
    updatePlayerPoints: (id: number, points: number) => void;
}) {
    return (
        <div className="card-container">
            <Card>
                <CardTitle className="card-title">
                    {player.first_name} {player.last_name}
                </CardTitle>
                <p className="card-details">
                    Team: <strong>{player.rink_name}</strong>
                </p>
                <p className="card-details">Points: {player.points}</p>
                <div className="win-button-container">
                    <WinButton id={player.id} players={players} updatePlayerPoints={updatePlayerPoints} />
                </div>
            </Card>
        </div>
    );
}