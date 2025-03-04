interface PlayerProps {
    id: number;
    rink_no: number;
    rink_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    team: string;
    points: number;
}

export default class Player {
    id: number;
    rink_no: number;
    rink_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    team: string;
    points: number;

    constructor({ id, rink_no, rink_name, first_name, last_name, phone, team, points }: PlayerProps) {
        this.id = id;
        this.rink_no = rink_no;
        this.rink_name = rink_name;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.team = team;
        this.points = points;
    }

    render() {
        return (
            <tr>
                <td>{this.first_name} {this.last_name}</td>
                <td>{this.team}</td>
                <td>{this.points}</td>
            </tr>
        );
    }
}