import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableChoreCard from "./AvailableChoreCard";
import ActivityFeed from "./ActivityFeed";
import UnavailableChoreCard from "./UnavailableChoreCard";
import NewChoreForm from "./NewChoreForm";
import {
  Segment,
  Card,
  Grid,
  Menu,
  Input,
  List,
  Image,
  Header,
  Popup
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
    return this.props.chores.map(chore => {
      if (chore.available && chore.personal_chore !== true) {
        return (
          <AvailableChoreCard
            chore={chore}
            key={chore.id}
            button="Claim"
            user={this.props.user}
            edit={this.props.edit}
            updateChore={this.props.updateChore}
          />
        );
      } else if (!chore.available && chore.personal_chore !== true) {
        return (
          <UnavailableChoreCard
            chore={chore}
            key={chore.id}
            button="Assigned"
            user={this.props.user}
            edit={this.props.edit}
            updateChore={this.props.updateChore}
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

  handleAddReload = tab => {
    this.setState({ activeItem: tab });
  };

  handleTab = () => {
    switch (this.state.activeItem) {
      case "chores":
        return this.allChores();
      case "activity":
        return (
          <Segment>
            <ActivityFeed type="household" user={this.props.user} />
          </Segment>
        );
      case "add chore":
        return (
          <NewChoreForm handleAddReload={this.handleAddReload} tab="chores" />
        );
      default:
        return this.allChores();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(
      `/household/${name
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

  createList = () => {
    const node = document.getElementById("list");
    return this.props.households.households[0].users.map(user => {
      return (
        <List.Item key={user.username}>
          <Image avatar src={user.profile_pic} />
          <List.Content>
            <List.Header as="a">
              <Popup
                style={{ height: "5%" }}
                trigger={
                  <div as="a">
                    {user.first_name} {user.last_name}
                  </div>
                }
                content={`@${user.username} currently has ${
                  user.points
                } points.`}
              />
            </List.Header>
          </List.Content>
        </List.Item>
      );
    });
  };

  render() {
    const { activeItem } = this.state;
    const tabContent = this.handleTab();
    const listItems = this.createList();
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment>
              {" "}
              <Header>Household Members</Header>
              <List id="list">{listItems}</List>
            </Segment>
          </Grid.Column>
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users,
    households: state.households,
    chores: state.users.chores
  };
};

export default withRouter(connect(mapStateToProps, actions)(Household));
