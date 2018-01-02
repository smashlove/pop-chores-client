import React, { Component } from "react";
// import { Menu } from "semantic-ui-react";

import { Route, Switch, withRouter } from "react-router-dom";

// import withAuth from "./withAuth.js";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
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
    if (name === "profile") {
      this.props.history.push("/profile");
    }
    if (name === "household") {
      this.props.history.push("/household");
    }
  };

  handleLogout() {
    this.props.logoutUser(this.state, this.props.history);
  }

  componentDidMount = () => {
    this.props.fetchHouseholds();
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
        <Switch>
          <Route
            exact
            path="/login"
            render={() => <Login households={this.props.households} />}
          />
          <Route
            exact
            path="/create"
            render={() => <CreateUser households={this.props.households} />}
          />
          <Route
            path="/"
            render={() =>
              this.props.loggedIn ? (
                <MainContainer loggedIn={this.props.loggedIn} />
              ) : (
                <Login />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.users.loggedIn,
    state: state,
    households: state.households.households
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
