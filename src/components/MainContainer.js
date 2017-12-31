import React, { Component } from "react";
import withAuth from "./withAuth";
import Household from "./Household";
import UserProfile from "./UserProfile";
import { Route, withRouter, Switch } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class MainContainer extends Component {
  componentDidMount = () => {
    this.props.checkUser(this.state, this.props.history);
  };

  render() {
    return (
      <Segment attached="bottom">
        {this.props.user ? (
          <div>
            <Switch>
              <Route path="/household" render={() => <Household />} />
              <Route path="/profile" render={() => <UserProfile />} />
              <Route exact path="/" render={() => <UserProfile />} />
            </Switch>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users,
    households: state.households,
    chores: state.chores
  };
};

export default withAuth(
  withRouter(connect(mapStateToProps, actions)(MainContainer))
);
