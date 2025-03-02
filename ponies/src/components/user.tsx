import React from 'react';

interface UserProps {
    name: string;
    phone: string;
}

class User extends React.Component<UserProps> {
    phone: string;
    name: string;

    constructor(props: UserProps) {
        super(props);
        this.phone = props.phone;
        this.name = props.name;
    }

    render() {
        return (
            <div>
                <h1>Hi, {this.name}!</h1>
                <p>Phone: {this.phone}</p>
            </div>
        );
    }
}

export default User;