import React, { Component } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import EditCard from "./EditCard";

class MyChoreCard extends Component {
  constructor() {
    super();

    this.state = {
      edit: false
    };
  }

  handleEdit = () => {
    this.edit();
  };

  edit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleComplete = e => {
    this.props.updateChore(
      this.props.chore,
      this.props.user,
      "complete",
      this.props.history
    );
  };

  render() {
    return !this.state.edit ? (
      <Card>
        <Card.Description>
          <Image
            rounded
            centered
            size="medium"
            src={this.props.chore.image_url}
          />
        </Card.Description>
        <Card.Content>
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Meta> {this.props.chore.description}</Card.Meta>

          <Card.Description />
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              icon
              labelPosition="left"
              onClick={this.handleComplete}
              basic
              color="yellow"
            >
              <Icon name="check" />Mark as Complete
            </Button>
            <Button size="small" basic>
              <strong>Points: {this.props.chore.points}</strong>
            </Button>
          </div>
          <Label
            attached="top right"
            icon="edit"
            corner
            as="a"
            size="mini"
            onClick={this.edit}
          />
        </Card.Content>
      </Card>
    ) : (
      <EditCard
        chore={this.props.chore}
        edit={this.handleEdit}
        user={this.props.user}
        history={this.props.history}
        updateChore={this.props.updateChore}
      />
    );
  }
}

export default MyChoreCard;
