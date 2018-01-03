import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Feed, Icon, Portal, Segment, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import AvailableChoreCard from "./AvailableChoreCard";
import UnavailableChoreCard from "./UnavailableChoreCard";

class FeedEvent extends Component {
  constructor() {
    super();

    this.state = { open: false, disable: false };
  }

  getTime = time => {
    var a = new Date(time);
    var b = new Date();
    var c = b.getTime() - a.getTime();

    function msToTime(duration) {
      // var milliseconds = parseInt((duration % 1000) / 100);
      // var seconds = parseInt((duration / 1000) % 60);
      // var minutes = parseInt((duration / (1000 * 60)) % 60);
      var hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

      hours =
        hours < 24
          ? hours > 1 ? hours + " hours ago" : "less than " + 1 + " hour ago"
          : hours / 24 + (hours / 24 > 1 ? " days ago" : " day ago");
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      // seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours;
    }
    return msToTime(c);
  };

  handleUpdateChore = () => {
    this.props.updateChore(
      this.props.event,
      this.props.user,
      "like",
      this.props.history
    );
  };
  handleAdd = () => {
    this.setState({ disable: true });
    this.props.handleAddReload(this.props.tab);
  };

  callCard = chore => {
    if (chore.available && !this.state.disable) {
      return (
        <AvailableChoreCard
          portal="true"
          chore={chore}
          key={chore.created_at}
          button="Claim"
          user={this.props.user}
          updateChore={this.props.updateChore}
          handleClose={this.handleClose}
          history={this.props.history}
          handleAdd={this.handleAdd}
          disable={this.state.disable}
        />
      );
    } else if (!chore.available || this.state.disable) {
      return (
        <UnavailableChoreCard
          portal="true"
          chore={chore}
          key={chore.created_at}
          button="Assigned"
          user={this.props.user}
          updateChore={this.props.updateChore}
          handleClose={this.handleClose}
          history={this.props.history}
        />
      );
    } else {
      return null;
    }
  };

  handleClick = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const nodePopup = document.getElementById("portal");
    let chore = this.props.chores.filter(
      chore => chore.id === this.props.event.chore_id
    )[0];
    const card = this.callCard(chore);
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={this.props.event.image_url} alt="" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>
              {this.props.event.user_id === this.props.loggedInUser
                ? "You "
                : `@${this.props.user.username}`}
            </Feed.User>
            {this.props.event.complete === true
              ? " completed the chore "
              : " claimed the chore "}

            {this.props.event.personal_chore ? (
              this.props.event.title + " (personal chore)"
            ) : (
              <a
                content={open ? "Close Portal" : "Open Portal"}
                negative={open}
                positive={!open}
                onClick={this.handleClick}
              >
                {this.props.event.title}
              </a>
            )}

            <Portal
              onClose={this.handleClose}
              open={open}
              mountNode={nodePopup}
            >
              <Segment
                style={{
                  left: "40%",
                  position: "fixed",
                  top: "30%",
                  zIndex: 1000
                }}
              >
                {card}
              </Segment>
            </Portal>

            <Feed.Date>
              {this.getTime(
                this.props.event.completed_at
                  ? this.props.event.completed_at
                  : this.props.event.claimed_at
              )}
            </Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like onClick={this.handleUpdateChore}>
              <Icon name="like" />
              {this.props.event.likes} Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    chores: state.households.households[0].chores
  };
};

export default connect(mapStateToProps, actions)(FeedEvent);
