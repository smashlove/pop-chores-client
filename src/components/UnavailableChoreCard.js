import React, { Component } from "react";
import { Card, Image, Button, Feed } from "semantic-ui-react";

class UnavailableChoreCard extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated="left" size="small" src={this.props.chore.image_url} />
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Description />
          {this.props.button === "Assigned" ? (
            <Card.Meta>
              Currently assigned to @{this.props.user.username}
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
        </Card.Content>
      </Card>
    );
  }
}

export default UnavailableChoreCard;
