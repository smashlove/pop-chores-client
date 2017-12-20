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
  Input
} from "semantic-ui-react";

import { connect } from "react-redux";

class UserProfile extends Component {
  constructor() {
    super();
  }
  state = { activeItem: "my chores" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleTab = () => {};

  render() {
    const { activeItem } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Segment>
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
          <Grid.Column width={13}>
            <Segment.Group vertical>
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
                  name="add new chore"
                  active={activeItem === "add new chore"}
                  onClick={this.handleItemClick}
                />
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input
                      transparent
                      icon={{ name: "search", link: true }}
                      placeholder="Search chores..."
                    />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>

              <Segment attached="bottom">
                <Grid>
                  <Grid.Row>
                    <Segment.Group horizontal>
                      <Segment>ToDo</Segment>
                      <Segment>Available</Segment>
                    </Segment.Group>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    households: state.households,
    user: state.users
  };
};

export default withRouter(connect(mapStateToProps, null)(UserProfile));
