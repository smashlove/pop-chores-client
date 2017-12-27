import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableChoreCard from "./AvailableChoreCard";
import UnavailableChoreCard from "./UnavailableChoreCard";
import {
  Segment,
  Card,
  Grid,
  Menu,
  Input,
  Form,
  Header
} from "semantic-ui-react";

import { connect } from "react-redux";
import * as actions from "../actions/index";

class Household extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: "chores"
    };
  }

  createChores = () => {
    return this.props.chores.household_chores.map(chore => {
      if (chore.available) {
        return <AvailableChoreCard chore={chore} key={chore.id} />;
      }
      if (!chore.available) {
        return <UnavailableChoreCard chore={chore} key={chore.id} />;
      }
    });
  };

  allChores = () => {
    return <Card.Group>{this.createChores()}</Card.Group>;
  };

  handleTab = () => {
    switch (this.state.activeItem) {
      case "chores":
        return this.allChores();
      case "activity":
        return <div>2</div>;
      case "scoreboard":
        return <div>3</div>;
      case "add household chore":
        return this.addChore();
      default:
        return this.allChores();
    }
  };

  addChore = () => {
    return (
      <Segment>
        <Header as="h2" color="teal" textAlign="center">
          Add a Household Chore
        </Header>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 550 }}>
            <Form onSubmit={this.handleChoreSubmit}>
              <Segment stacked>
                <Form.Input
                  name="title"
                  placeholder="Title"
                  onChange={this.handleChange}
                />

                <Form.Input
                  name="point_value"
                  type="number"
                  placeholder="Point Value"
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                />
                <Form.Input
                  icon={{ name: "photo" }}
                  iconPosition="left"
                  name="image_url"
                  placeholder="Image URL"
                  onChange={this.handleChange}
                />
                <Form.Button content="Add" color="teal" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(`/household/${name}`);
  };

  render() {
    const { activeItem } = this.state;
    const tabContent = this.handleTab();
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            <Segment.Group>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="chores"
                  active={activeItem === "chores"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="activity"
                  active={activeItem === "activity"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="scoreboard"
                  active={activeItem === "scoreboard"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="add household chore"
                  active={activeItem === "add household chore"}
                  onClick={this.handleItemClick}
                />
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input
                      transparent
                      icon={{ name: "search", link: true }}
                      placeholder="Search..."
                    />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>

              <Segment attached="bottom">{tabContent}</Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users,
    households: state.households,
    chores: state.chores
  };
};

export default withRouter(connect(mapStateToProps, actions)(Household));
