// Define the Player type
export interface Player {
    id: number;
    rink_no: number;
    rink_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    team: string;
    sheet: number;
    points: number;
}

export interface Team {
    id: number,
    name: string,
    players: Player[],
}

// Define the Race type
export interface Race {
    id: number,
    teams: Team[],
}