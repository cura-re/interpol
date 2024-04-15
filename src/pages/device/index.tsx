import { Component } from 'react';

class Device extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        };
    }

    turnOn() {
        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/devices/turnOn/1`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1 })
        })
            .then((response) => response.json())
            .then((data) => this.setState({ data: data }));
    }

    turnOff() {
        fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/devices/turnOn/0`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1 })
        })
            .then((response) => response.json())
            .then((data) => this.setState({ data: data }));
    }

    componentDidMount() {
        // fetch('/api/device')
        //     .then((response) => response.json())
        //     .then((data) => this.setState({ data: data }));
    }
    render() {
        return (
            <div>
                <h1>Device</h1>
                <p>This is the device page.</p>
                <button onClick={this.turnOn}>Turn On</button>
                <button onClick={this.turnOff}>Turn Off</button>
            </div>
        );
    }
}

export default Device;