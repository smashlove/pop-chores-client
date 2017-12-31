import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AvailableChoreCard from "./AvailableChoreCard";
import ActivityFeed from "./ActivityFeed";
import UnavailableChoreCard from "./UnavailableChoreCard";
import NewChoreForm from "./NewChoreForm";
import { Segment, Card, Grid, Menu, Input } from "semantic-ui-react";

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
      case "scoreboard":
        return <div>3</div>;
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
    chores: state.users.chores
  };
};

export default withRouter(connect(mapStateToProps, actions)(Household));
