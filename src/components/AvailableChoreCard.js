import React, { Component } from "react";
import { Card, Image, Button, Label } from "semantic-ui-react";
import EditCard from "./EditCard";
import { connect } from "react-redux";

class AvailableChoreCard extends Component {
  constructor() {
    super();

    this.state = {
      edit: false,
      disable: false
    };
  }

  handleClaim = () => {
    this.props.updateChore(
      this.props.chore,
      this.props.user,
      "add",
      this.props.history
    );
    if (this.props.portal === "true") {
      this.props.handleClose();
      this.handleAdd();
      this.props.handleAdd();
    }
  };

  handleAdd = () => {
    this.setState({ disable: true });
  };

  handleEdit = () => {
    this.edit();
  };

  edit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log("sup", this.props.chore);
    return !this.state.edit ? (
      <Card>
        <Card.Content>
          <Image floated="left" size="small" src={this.props.chore.image_url} />
          <Card.Header>{this.props.chore.title}</Card.Header>
          <Card.Meta> {this.props.chore.description}</Card.Meta>
          <Card.Description />
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
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(mapStateToProps, null)(AvailableChoreCard);
