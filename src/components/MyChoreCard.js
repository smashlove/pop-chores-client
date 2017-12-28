import React, { Component } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

class MyChoreCard extends Component {
  handleComplete = e => {
    this.props.updateChore(this.props.chore, this.props.user);
  };

  render() {
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
              <strong>Points: {this.props.chore.point_value}</strong>
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default MyChoreCard;
