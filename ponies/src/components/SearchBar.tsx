import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Player } from '../types';

interface SearchBarProps {

    players: Player[];

}


export default function SearchBar({ players }: SearchBarProps) {
    const [search, setSearch] = useState<string>('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const foundList: Player[] = [];
        const value = event.target.value.split(' ').join().toLocaleLowerCase();
        setSearch(value); // This will update the search state with the value from the input field immediately.
        // The search will look by substring.
        for (const p of players) {
            const target = (p.first_name + ' ' + p.last_name).toLocaleLowerCase().split(' ').join();
            for (let i = 0; i < p.first_name.length + p.last_name.length; i++) {
                if (target.substring(i, i + value.length) === value.substring(i, i + value.length)) {
                    foundList.push(p);
                    break;
                }
            }
        }
        console.log(foundList);
        return foundList;
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Player Name</Form.Label>
                <Form.Control type="text" placeholder="Enter player name" onChange={handleInputChange} />
            </Form.Group>
        </Form>
    );
}