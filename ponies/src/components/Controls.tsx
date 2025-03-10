import React, { useState, useRef } from 'react';
import '../styles/PlayerComponent.css';
import { Form, Button } from 'react-bootstrap';
import { Player } from '../types';

interface ControlsProps {
    players: Player[];
    updatePlayerPoints: (id: number, points: number) => void;
}

export default function Controls(props: ControlsProps) {
    const [user, setUser] = useState<string[]>(['', '']);

    function handleWin() {
        console.log('handleWin called');
        // Check if both first and last name are entered
        if (!user[0] || !user[1]) {
            alert('Please enter both first and last name');
            return;
        }
        const winnerFirst = user[0];
        const winnerLast = user[1];
        console.log('Winner First Name:', winnerFirst);
        console.log('Winner Last Name:', winnerLast);

        const winnerId = props.players.find(player => player.first_name === winnerFirst && player.last_name === winnerLast)?.id;
        if (winnerId) {
            props.updatePlayerPoints(winnerId, 1);
        }
        else {
            alert('Player not found');
        }
        
        window.location.reload();
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const nameParts = value.split(' ');
        setUser([nameParts[0] || '', nameParts[1] || '']);
    }

    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>Player Name</Form.Label>
                <Form.Control type="text" placeholder="Enter player name" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Button variant="danger" type="button" onClick={handleWin}>
                    Won the Race!
                </Button>
            </Form.Group>
        </Form>
        </>
    );
}
