import React, { useState, useEffect } from 'react';
import '../styles/PlayerComponent.css';
import SearchBar from './SearchBar';
import { Form, Button } from 'react-bootstrap';
import { Player } from '../types';

interface WinButtonProps {
    players: Player[];
    id: number;
    updatePlayerPoints: (id: number, points: number) => void;
}

export default function WinButton(props: WinButtonProps) {
    const [id, setId] = useState<number>(props.id);
    const [points, setPoints] = useState<number>(localStorage.getItem('points') ? parseInt(localStorage.getItem('points') || '0') : 0);

    useEffect(() => {
        setId(props.id);
    }, [props.id]);
    function handleWin() {
        console.log('handleWin called');
        // Check if both first and last name are entered
        if (!id) {
            alert('Please enter a player ID');
            return;
        }
        else {
            // Update the player's points
            const player = props.players.find(player => player.id === id);
            if (player) {
                // Update the player's points
                props.updatePlayerPoints(id, points + 1);
                setPoints(points + 1);
                localStorage.setItem('points', (points + 1).toString());
            }
            else {
                alert('Player not found');
            }
        }
    }

    return (
        <>
        <Form>
            <Form.Group>
                <Button variant="danger" type="button" onClick={handleWin}>
                    Won the Race!
                </Button>
            </Form.Group>
        </Form>
        </>
    );
}
