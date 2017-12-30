import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Image, Button, Feed, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import FeedEvent from "./FeedEvent";

class ActivityFeed extends Component {
  constructor() {
    super();

    this.state = { limit: 15 };
  }

  createFeed = () => {
    const limit = this.state.limit;

    if (this.props.type === "household") {
      return this.props.all_activity.slice(0, limit).map(event => {
        return (
          <FeedEvent
            event={event}
            key={event.created_at}
            user={this.props.users.filter(user => user.id === event.user_id)[0]}
            updateChore={this.props.updateChore}
            loggedInUser={this.props.user.id}
          />
        );
      });
    }

    if (this.props.type === "user") {
      return this.props.all_activity.slice(0, limit).map(event => {
        if (event.user_id === this.props.user.id)
          return (
            <FeedEvent
              event={event}
              key={event.created_at}
              user={
                this.props.users.filter(user => user.id === event.user_id)[0]
              }
              updateChore={this.props.updateChore}
              loggedInUser={this.props.user.id}
            />
          );
      });
    }
  };

  render() {
    const all_activity = this.createFeed();

    return (
      <Feed>
        {all_activity}
        <Button
          onClick={() => this.setState({ limit: (this.state.limit += 10) })}
        >
          Load more...
        </Button>
      </Feed>
    );
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
