import '../styles/App.css';
import type { Player } from '../types';
import { Card, CardTitle } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function PlayerComponent(props: { player: Player }) {
    const { player } = props;
    const [localPoints, setLocalPoints] = useState(0);

    useEffect(() => {
        // Ensure points are properly initialized in localStorage
        const points = localStorage.getItem('points')
            ? JSON.parse(localStorage.getItem('points') || '[]')
            : null;

        if (!points || points.length === 0) {
            const initialPoints = Array(128).fill(0); // Initialize with 128 zeros
            localStorage.setItem('points', JSON.stringify(initialPoints));
        } else {
            setLocalPoints(points[player.id] || 0); // Set local points from localStorage
        }
    }, [player.id]); // Run only when the component mounts or player.id changes

    // Update points for the current player
    const updatePoints = () => {
        const points = JSON.parse(localStorage.getItem('points') || '[]');
        points[player.id] = (points[player.id] || 0) + 1; // Increment points for the player
        localStorage.setItem('points', JSON.stringify(points));
        setLocalPoints(points[player.id]); // Update local points
    };

    // Get points for the current player
    const getPlayerPoints = () => {
        return localPoints;
    };

    return (
        <div className="card-container">
            <Card>
                <CardTitle className="card-title">
                    {player.first_name} {player.last_name}
                </CardTitle>
                <p className="card-details">
                    Team: <strong>{player.rink_name}</strong>
                </p>
                <p className="card-details">Points: {getPlayerPoints()}</p>
                <button onClick={updatePoints}>Add Point</button>
            </Card>
        </div>
    );
}