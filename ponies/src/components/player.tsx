interface PlayerProps {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    teamName: string;
    sheet: number;
}

export default class Player {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    team: string;
    sheet: number;
    points: number = 0;

    constructor({ id, firstName, lastName, phone, teamName, sheet }: PlayerProps) {
        this.id = id;
        this.firstname = firstName;
        this.lastname = lastName;
        this.phone = phone;
        this.team = teamName;
        this.sheet = sheet;
    }

    render() {
        return (
            <tr>
                <td>{this.firstname} {this.lastname}</td>
                <td>{this.team}</td>
                <td>{this.points}</td>
            </tr>
        )
    }
}