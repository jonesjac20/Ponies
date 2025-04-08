import { createContext } from 'react';
import { Team } from '../types';

const TeamContext = createContext<Map<string, Team>>(new Map());

export default TeamContext;