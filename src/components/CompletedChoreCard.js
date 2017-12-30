import React, { Component } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class CompletedChoreCard extends Component {
  handleComplete = e => {
    this.props.updateChore(
      this.props.chore,
      this.props.user,
      "complete",
      this.props.history
    );
    this.props.checkUser(this.props.user, this.props.history);
  };

  render() {
    console.log(this.props);
    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="small" src={this.props.chore.image_url} />
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Meta> {this.props.chore.description}</Card.Meta>

          <Card.Description>{this.props.chore.id}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button disabled basic color="grey">
              Completed
            </Button>
            <Button size="small" basic>
              <strong>{this.props.chore.due_date}</strong>
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    households: state.households,
    user: state.users,
    user_chores: state.user_chores.filter(chore => chore.complete === true)
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(CompletedChoreCard)
);
