import React, { Component } from "react";
import { Card, Image, Button, Label } from "semantic-ui-react";
import EditCard from "./EditCard";

class AvailableChoreCard extends Component {
  constructor() {
    super();

    this.state = {
      edit: false
    };
  }

  handleClaim = () => {
    this.props.updateChore(
      this.props.chore,
      this.props.user,
      "add",
      this.props.history
    );
  };

  handleEdit = () => {
    this.edit();
  };

  edit = () => {
    this.setState({ edit: !this.state.edit });
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
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button onClick={this.handleClaim} basic color="green">
              {this.props.button}
            </Button>
            <Button basic>
              <strong>Points: {this.props.chore.point_value}</strong>
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

export default AvailableChoreCard;
