import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div>
               <Link className="nav-link" to="/recover">User</Link>
            </div>
        )
    }
}