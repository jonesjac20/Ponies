import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export const User = () => {
    interface User {
        name: string;
        phone: string;
    }

    const [user, setUser] = useState<User | null>(null);

    return (
        <Card>
        <Card.Body>
            {user ? (
                <>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.phone}</Card.Text>
                </>
            ) : (
                <Card.Text>No user data available</Card.Text>
            )}
        </Card.Body>
        </Card>
    );
}