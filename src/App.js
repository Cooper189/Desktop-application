import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, HashRouter  } from 'react-router-dom';
import Authorization from './components/Authorization';
import Menu from './components/Menu';
import { NestedViews } from './components/user-routing'


class App extends Component {
  render() {
    return (
      <div>
      <Switch>
        <Route exact path="/" component={Authorization} />
        <Route path="/recover" component={NestedViews} />
        <Route component={Authorization} />
      </Switch>
      </div>
    );
  }
}

export default App;
