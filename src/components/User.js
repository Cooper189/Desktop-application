import React, {Component} from 'react';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.electron = window.require('electron');
        this.electron.ipcRenderer.send('menu:add');
        this.electron.ipcRenderer.on('menu:add', (e, item) => {
            this.setState({
                users: JSON.parse(item)
            })
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.users.map((item, index) => {
                        return <div key={index}>
                            <span>{item.title}</span>
                            <span>{item.userName}</span>
                        </div>
                    })
                }
            </div>
        )
    }
}