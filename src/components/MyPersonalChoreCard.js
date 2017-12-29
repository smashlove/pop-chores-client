import React, { Component } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class MyPersonalChoreCard extends Component {
  handleAdd = e => {
    this.props.updateChore(
      this.props.chore,
      this.props.user,
      "add",
      this.props.history
    );
    this.props.checkUser(this.props.user, this.props.history);
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="small" src={this.props.chore.image_url} />
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Meta> {this.props.chore.description}</Card.Meta>

          <Card.Description />
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button onClick={this.handleAdd} basic color="green">
              Add
            </Button>
            <Button size="small" basic>
              <strong>Points: {this.props.chore.point_value}</strong>
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
    chores: state.chores
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(MyPersonalChoreCard)
);
