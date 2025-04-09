import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Player, Team } from '../types';
import '../styles/WinButton.css';
import TeamContext from '../context/TeamContext';

export default function WinButton() {
    const points = localStorage.getItem('points') ? JSON.parse(localStorage.getItem('points') || '') : 0;
    function handleWin() {
        localStorage.setItem('points', JSON.stringify(points + 1));
    }

    return (
        <>
        <Button onClick={handleWin} className="win-button" />
        </>
    )
}