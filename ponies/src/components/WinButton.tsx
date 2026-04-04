import { Button } from 'react-bootstrap';
import '../styles/WinButton.css';

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