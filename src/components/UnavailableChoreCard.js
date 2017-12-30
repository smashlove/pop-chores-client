import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";

class UnavailableChoreCard extends Component {
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
