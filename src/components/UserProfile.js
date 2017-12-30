import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableChoreCard from "./AvailableChoreCard";
import UnavailableChoreCard from "./UnavailableChoreCard";
import MyChoreCard from "./MyChoreCard";
import ActivityFeed from "./ActivityFeed";

import {
  Image,
  Segment,
  Card,
  Grid,
  Menu,
  Input,
  Form,
  Header
} from "semantic-ui-react";
import * as actions from "../actions/index";

import { connect } from "react-redux";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: "my chores",
      title: "",
      point_value: "",
      description: "",
      image_url: "",
      available: true,
      personal_chore: false
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(
      `/profile/${name
        .split("")
        .map(char => {
          if (char === " ") {
            return "-";
          } else {
            return char;
          }
        })
        .join("")}`
    );
  };

  handleTab = () => {
    switch (this.state.activeItem) {
      case "my chores":
        return this.myChores();
      case "my activity":
        return this.myActivity();
      case "add chore":
        return this.addNewChore();
      default:
        return null;
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChoreSubmit = e => {
    e.preventDefault();
    this.props.createChore(this.state, this.props.history, this.props.user);
  };

  handleRadio = (e, { value }) => {
    this.setState({ value });
    if (value === "personal") {
      this.setState({ chore_owner: this.props.user.id, personal_chore: true });
    }
  };

  addNewChore = () => {
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

  myChores = () => {
    return (
      <Segment>
        <Card.Group>{this.createChores()}</Card.Group>
      </Segment>
    );
  };

  myActivity = () => {
    return (
      <Segment>
        <ActivityFeed type="user" user={this.props.user} />
      </Segment>
    );
  };

  createActivity = () => {
    return this.props.user.user_chores.map(chore => {
      if (chore.complete === true) {
        return (
          <UnavailableChoreCard
            chore={chore}
            key={chore.id}
            button="Completed"
            user={this.props.user}
          />
        );
      }
    });
  };

  createChores = () => {
    return this.props.user.user_chores.map(chore => {
      if (chore.complete !== true) {
        return (
          <MyChoreCard
            chore={chore}
            key={chore.id}
            updateChore={this.props.updateChore}
            user={this.props.user}
            checkUser={this.props.checkUser}
          />
        );
      }
    });
  };

  createPersonalChores = () => {
    return this.props.personal_chores.map(chore => {
      if (chore.available === true) {
        return (
          <Segment key={chore.id}>
            <AvailableChoreCard
              chore={chore}
              updateChore={this.props.updateChore}
              checkUser={this.props.checkUser}
              user={this.props.user}
              button="Add"
            />
          </Segment>
        );
      }
    });
  };

  render() {
    const { activeItem } = this.state;

    const personalChores = this.createPersonalChores();

    const tabContent = this.handleTab();
    console.log(this.props);
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} align="center">
            <Segment compact>
              <Card>
                <Image src={this.props.user.profile_pic} />
                <Card.Content>
                  <Card.Header>
                    {this.props.user.first_name} {this.props.user.last_name}
                  </Card.Header>
                  <Card.Meta>@{this.props.user.username}</Card.Meta>
                  <Card.Description>
                    Cleaning up the Netflix queue.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>{this.props.user.points} Points</a>
                </Card.Content>
              </Card>
            </Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Segment.Group>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="my chores"
                  active={activeItem === "my chores"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="my activity"
                  active={activeItem === "my activity"}
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
        </Grid.Row>
        <Grid.Row>{personalChores}</Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    households: state.households,
    user: state.users,
    chores: state.users.chores,
    personal_chores: state.users.personal_chores,
    user_chores: state.users.user_chores
  };
};

export default withRouter(connect(mapStateToProps, actions)(UserProfile));
