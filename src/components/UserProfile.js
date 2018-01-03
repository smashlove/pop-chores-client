import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableChoreCard from "./AvailableChoreCard";
import MyChoreCard from "./MyChoreCard";
import NewChoreForm from "./NewChoreForm";
import ActivityFeed from "./ActivityFeed";
import EditUser from "./EditUser";

import {
  Image,
  Segment,
  Card,
  Grid,
  Menu,
  Input,
  Label
} from "semantic-ui-react";
import * as actions from "../actions/index";

import { connect } from "react-redux";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: "my chores",
      edit: false
    };
  }

  handleEdit = () => {
    this.edit();
  };

  edit = () => {
    this.setState({ edit: !this.state.edit });
  };

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
        return (
          <NewChoreForm
            handleAddReload={this.handleAddReload}
            tab="my chores"
          />
        );
      case "personal chores":
        return this.myPersonalChores();
      default:
        return null;
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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

  myPersonalChores = () => {
    return <Card.Group>{this.createPersonalChores()}</Card.Group>;
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
            edit={this.props.edit}
          />
        );
      } else {
        return null;
      }
    });
  };

  handleAddReload = tab => {
    this.setState({ activeItem: tab });
  };

  createPersonalChores = () => {
    return this.props.personal_chores.map(chore => {
      if (chore.available === true) {
        return (
          <AvailableChoreCard
            key={chore.id}
            chore={chore}
            updateChore={this.props.updateChore}
            checkUser={this.props.checkUser}
            user={this.props.user}
            button="Add"
            edit={this.props.edit}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    const { activeItem } = this.state;

    const tabContent = this.handleTab();

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} align="center">
            <Segment compact>
              {!this.state.edit ? (
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
                  </Card.Content>{" "}
                  <Label
                    attached="top right"
                    icon="edit"
                    corner
                    as="a"
                    size="mini"
                    onClick={this.edit}
                  />
                </Card>
              ) : (
                <EditUser
                  edit={this.handleEdit}
                  user={this.props.user}
                  history={this.props.history}
                  updateUser={this.props.updateUser}
                />
              )}
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
                  name="personal chores"
                  active={activeItem === "personal chores"}
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
                />{" "}
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
        <Grid.Row />
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
