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
      activeItem: "chores",
      title: "",
      point_value: "",
      description: "",
      image_url: "",
      available: true,
      personal_chore: false
    };
  }

  createChores = () => {
    return this.props.chores.household_chores.map(chore => {
      if (chore.available && chore.personal_chore !== true) {
        return (
          <AvailableChoreCard
            chore={chore}
            key={chore.id}
            button="Claim"
            updateChore={this.props.updateChore}
            user={this.props.user}
            checkUser={this.props.checkUser}
          />
        );
      } else if (!chore.available && chore.personal_chore !== true) {
        return (
          <UnavailableChoreCard
            chore={chore}
            key={chore.id}
            button="Assigned"
            user={this.props.user}
          />
        );
      } else {
        return null;
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
      case "add chore":
        return this.addChore();
      default:
        return this.allChores();
    }
  };

  handleRadio = (e, { value }) => {
    this.setState({ value });
    if (value === "personal") {
      this.setState({ chore_owner: this.props.user.id, personal_chore: true });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addChore = () => {
    const { value } = this.state;
    return (
      <Segment>
        <Header as="h2" color="teal" textAlign="center">
          Add a Chore
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
                <Form.Group inline>
                  <Form.Radio
                    label="Personal"
                    value="personal"
                    checked={value === "personal"}
                    onChange={this.handleRadio}
                  />
                  <Form.Radio
                    label="Household"
                    value="household"
                    checked={value === "household"}
                    onChange={this.handleRadio}
                  />
                </Form.Group>
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

  handleChoreSubmit = e => {
    e.preventDefault();
    this.props.createChore(this.state, this.props.history, this.props.user);
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
                  name="add chore"
                  active={activeItem === "add chore"}
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
