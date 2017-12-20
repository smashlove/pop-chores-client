import React, { Component } from "react";
import withAuth from "./withAuth";
import Household from "./Household";
import UserProfile from "./UserProfile";
import { Route, withRouter } from "react-router-dom";

class Container extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <UserProfile />} />
        <Route exact path="/household" render={() => <Household />} />
        <Route exact path="/profile" render={() => <UserProfile />} />
      </div>
    );
  }
}

export default withAuth(withRouter(Container));
