import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Image,
  Container,
  Segment,
  Card,
  Icon,
  Grid,
  Menu,
  Input,
  Form,
  Button
} from "semantic-ui-react";

import { connect } from "react-redux";

class Household extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: "chores"
    };
  }

  handleTab = () => {
    switch (this.state.activeItem) {
      case "chores":
        return <div>1</div>;
      case "activity":
        return <div>2</div>;
      case "scoreboard":
        return <div>3</div>;
    }
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
  console.log(state);
  return {
    user: state.users,
    households: state.households,
    chores: state.chores
  };
};

export default withRouter(connect(mapStateToProps, null)(Household));
