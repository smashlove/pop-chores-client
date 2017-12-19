import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import withAuth from "./withAuth.js";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Container from "./Container";
import CreateUser from "./CreateUser";
import Login from "./Login";
import * as actions from "../actions/index";

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "sign-in") {
      this.props.history.push("/login");
    }
    if (name === "sign-out") {
      this.handleLogout();
    }
  };

  handleLogout() {
    this.props.logoutUser(this.state, this.props.history);
  }

  componentDidMount = () => {
    console.log("comp did mount", this.props);
    this.props.households();
    if (localStorage.token !== undefined) {
      this.props.checkUser(this.state, this.props.history);
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="App">
        <Navbar
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
        />
        <Route exact path="/login" render={() => <Login />} />
        <Route
          exact
          path="/"
          render={() =>
            this.props.loggedIn ? (
              <Container loggedIn={this.props.loggedIn} />
            ) : (
              <Login />
            )
          }
        />
        <Route exact path="/create" render={() => <CreateUser />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.users.loggedIn
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
