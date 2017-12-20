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

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: "my chores",
      title: "",
      point_value: "",
      description: "",
      image_url: ""
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleTab = () => {
    switch (this.state.activeItem) {
      case "my chores":
        return this.myChores();
      case "my activity":
        return this.myActivity();
      case "add new chore":
        return this.addNewChore();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChoreSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  addNewChore = () => {
    return (
      <Segment>
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

  myChores = () => {
    return <Segment>chores</Segment>;
  };

  myActivity = () => {
    return <Segment>activity</Segment>;
  };

  render() {
    const { activeItem } = this.state;

    const tabContent = this.handleTab();

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
  console.log(state);
  return {
    households: state.households,
    user: state.users
  };
};

export default withRouter(connect(mapStateToProps, null)(UserProfile));
