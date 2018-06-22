import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/login.action';
import { Redirect } from 'react-router-dom';

class Authorization extends Component {
    componentDidMount() {
        this.electron = window.require('electron');
        console.log('electron');
        this.loginAs();
    }
    loginAs() {
        const sendItem = this._login.value ? {login: this._login.value, pass: this._pass.value} : null;
        this.electron.ipcRenderer.send('post:add', sendItem);
        this.electron.ipcRenderer.on('post:add', (e, item) => {
            this.props.add(JSON.parse(item));
        });
    }
    render() {
        if (this.props.user.data) {
            return (<Redirect to="/recover" />)
        }
        return (
            <div>
                <div>
                    <label>Login: </label>
                    <input type="text" ref={(login) => this._login = login} />
                </div>
                <div>
                    <label>Pass: </label>
                    <input type="password" ref={(pass) => this._pass = pass} />
                </div>
                <button onClick={() => this.loginAs()}>Login</button>  
            </div>
        )
    }
}
const stateCurrent = (state) => ({user: state.login});
const dispatchCurrent = (dispatch) => {
    return {
        add: (item) => {
          dispatch(addUser(item))
        },
        err(err) {
            dispatch({type: 'ERR', err})
        }
      }
};
export default connect(stateCurrent, dispatchCurrent)(Authorization);
