import React, { Component } from "react";
import withAuth from "./withAuth";
import Household from "./Household";
import UserProfile from "./UserProfile";
import { Route, withRouter } from "react-router-dom";
import { Image, Container, Segment } from "semantic-ui-react";

class MainContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <Segment attached="bottom">
        <Route exact path="/household" render={() => <Household />} />
        <Route exact path="/profile" render={() => <UserProfile />} />
        <Route exact path="/" render={() => <UserProfile />} />
      </Segment>
    );
  }
}

export default withAuth(withRouter(MainContainer));
