import React, { Component } from "react";
import { Card, Image, Button, Label } from "semantic-ui-react";
import EditCard from "./EditCard";

class UnavailableChoreCard extends Component {
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

  render() {
    console.log(this.props);

    return !this.state.edit ? (
      <Card>
        <Card.Content>
          <Image floated="left" size="small" src={this.props.chore.image_url} />
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Description />
          {this.props.button === "Assigned" ? (
            <Card.Meta>
              Currently assigned to{" "}
              <a>@{this.props.chore.currently_assigned}</a>
            </Card.Meta>
          ) : (
            <Card.Meta>
              Completed on {this.props.chore.date_completed}
            </Card.Meta>
          )}
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button disabled basic color="grey">
              {this.props.button}
            </Button>
            <Button basic>
              <strong>Points: {this.props.chore.point_value}</strong>
            </Button>
          </div>
          {this.props.portal !== "true" ? (
            <Label
              attached="top right"
              icon="edit"
              corner
              as="a"
              size="mini"
              onClick={this.edit}
            />
          ) : null}
        </Card.Content>
      </Card>
    ) : (
      <EditCard
        chore={this.props.chore}
        edit={this.handleEdit}
        user={this.props.user}
        history={this.props.history}
        updateChore={this.props.updateChore}
        delete="false"
      />
    );
  }
}

export default UnavailableChoreCard;
