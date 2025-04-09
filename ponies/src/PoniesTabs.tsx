import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Leaderboard from './screens/Leaderboard';
import Admin from './screens/Admin';

export default function PoniesTabs() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/leaderboard">Leaderboard</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}