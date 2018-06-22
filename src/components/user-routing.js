import React from 'react';
import {  Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import User from './User';
import Menu from './Menu';


const NestedView = ({ match, login }) => {
  if (login.data) {
    return (
      <div>
        <Menu />
        <Route exact path={match.url} component={User}/>
      </div>
    )
  } else {
    return (<Redirect to="/" />);
  }
  
};

const mapStateToProps = (state) => {
  return {
    login : state.login       
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
};
export const NestedViews = connect(mapStateToProps, mapDispatchToProps)(NestedView);
