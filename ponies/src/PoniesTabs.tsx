import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './screens/Home';
import Leaderboard from './screens/Leaderboard';
import Admin from './screens/Admin';

export default function PoniesTabs() {
    return (
        <Router>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    );
}