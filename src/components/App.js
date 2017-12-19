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

const url = "http://localhost:3001/api/v1";

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

  // onLogin = form => {
  //   // debugger;
  //   fetch(`${url}/auth`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       accept: "application/json",
  //       Authorization: localStorage.getItem("jwt")
  //     },
  //     body: JSON.stringify(form.fields)
  //   })
  //     .then(res => res.json())
  //     .then(user => {
  //       if (!user.error) {
  //         this.setState({
  //           authorization: { isLoggedIn: true, user: user },
  //           error: ""
  //         });
  //         localStorage.setItem("jwt", user.jwt);
  //         this.findCurrentUser();
  //         this.props.history.push(`/`);
  //       } else {
  //         this.setState({ error: user.error });
  //       }
  //     });
  // };

  // findCurrentUser = () => {
  //   return fetch(`${url}/current_user`, {
  //     headers: {
  //       "content-type": "application/json",
  //       accept: "application/json",
  //       Authorization: this.parseJwt(localStorage.getItem("jwt")).user_id
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json =>
  //       this.setState({ authorization: { user: json, isLoggedIn: true } })
  //     );
  // };
  //
  // parseJwt(token) {
  //   const base64Url = token.split(".")[1];
  //   const base64 = base64Url.replace("-", "+").replace("_", "/");
  //   return JSON.parse(window.atob(base64));
  // }
  //
  handleLogout() {
    this.props.logoutUser(this.state, this.props.history);
  }

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
          render={() => <Container loggedIn={this.props.loggedIn} />}
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
