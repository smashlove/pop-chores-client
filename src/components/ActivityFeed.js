import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Image, Button, Feed, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import FeedEvent from "./FeedEvent";

class ActivityFeed extends Component {
  createFeed = () => {
    console.log(this.props);
    return this.props.all_activity.map(event => {
      return (
        <FeedEvent
          event={event}
          key={event.created_at}
          user={this.props.users.filter(user => user.id === event.user_id)[0]}
        />
      );
    });
  };

  render() {
    const all_activity = this.createFeed();

    return <Feed>{all_activity}</Feed>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    households: state.households,
    users: state.households.households.filter(
      household => household.id === state.users.user_household.id
    )[0].users,
    chores: state.users.chores,
    personal_chores: state.users.personal_chores,
    user_chores: state.users.user_chores,
    all_activity: state.users.all_activity
  };
};

export default withRouter(connect(mapStateToProps, actions)(ActivityFeed));
