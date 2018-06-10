import React, { Component } from 'react';
import User from './components/User';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, HashRouter  } from 'react-router-dom';
import Authorization from './components/Authorization';
import Menu from './components/Menu';


class App extends Component {
  render() {
    return (
      <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Authorization} />
        <Route path="/recover" component={User} />
        <Route component={Authorization} />
      </Switch>
      </div>
    );
  }
}

export default App;
