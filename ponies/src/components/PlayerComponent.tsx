import React, {useContext} from 'react';
import '../styles/PlayerComponent.css';
import type { Player, Team } from '../types';
import { Card, CardTitle } from 'react-bootstrap';
import WinButton from './WinButton';
import TeamContext from '../context/TeamContext';
export default function PlayerComponent(props: { player: Player }) {
    const player = props.player;
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
                    <WinButton />
                </div>
            </Card>
        </div>
    );
}