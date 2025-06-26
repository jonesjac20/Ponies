import { createContext } from 'react';
import { Player } from '../types';

const TeamContext = createContext({
  teamsList: new Map<string, Player[]>(), // The Teams map
  players: [] as Player[],          // The Player array
});

export default TeamContext;