import React, { Component } from "react";
import { Card, Image, Button, Feed, Icon, Popup } from "semantic-ui-react";

class FeedEvent extends Component {
  getTime = time => {
    var a = new Date(time);
    var b = new Date();
    var c = b.getTime() - a.getTime();
    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours =
        hours < 24
          ? hours > 1 ? hours + " hours ago" : "less than " + 1 + " hour ago"
          : hours / 24 + (hours / 24 > 1 ? " days ago" : " day ago");
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

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

  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={this.props.event.image_url} />
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
            <a>{this.props.event.title}</a>

            <Feed.Date>{this.getTime(this.props.event.completed_at)}</Feed.Date>
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

export default FeedEvent;
