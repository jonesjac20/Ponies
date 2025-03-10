import React from 'react';
import '../styles/PlayerComponent.css';
import type { Player } from '../types';
import { Card, CardTitle } from 'react-bootstrap';

export default function PlayerComponent({ player }: { player: Player }) {
    // This will be an individual player. It should have their name, their points, and their team. 
    // All other information is secondary and will be used for behind-the-scenes calculations.
    return (
        <div>
            <Card bg='danger'>
                <CardTitle className="name">{player.first_name} {player.last_name}</CardTitle>
                <p>Team: <strong>{player.rink_name}</strong></p>
                <p>Points: {player.points}</p>
            </Card>
        </div>
    );
}