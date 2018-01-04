import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../actions/index";

import { connect } from "react-redux";

import { Form, Grid, Header, Segment, Dropdown } from "semantic-ui-react";

class NewChoreForm extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      point_value: "",
      description: "",
      image_url: "",
      available: true,
      personal_chore: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRadio = (e, { value }) => {
    this.setState({ value });
    if (value === "personal") {
      this.setState({ chore_owner: this.props.user.id, personal_chore: true });
    }
  };

  handleChoreSubmit = e => {
    this.props.createChore(this.state, this.props.history, this.props.user);
    this.props.handleAddReload(this.props.tab);
  };

  handleDropdown = (e, data) => {
    this.setState({ point_value: data.value });
  };

  render() {
    const { value } = this.state;
    const options = [
      { key: 0, text: "0", value: 0 },
      { key: 1, text: "5", value: 5 },
      { key: 2, text: "10", value: 10 },
      { key: 3, text: "15", value: 15 },
      { key: 4, text: "20", value: 20 }
    ];

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
                  />{" "}
                  <Dropdown
                    placeholder="Select Point Value"
                    name="point_value"
                    options={options}
                    button
                    basic
                    floating
                    selection
                    onChange={this.handleDropdown}
                    value={this.state.point_value}
                  />
                </Form.Group>
                <Form.Button content="Add" color="teal" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
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

export default withRouter(connect(mapStateToProps, actions)(NewChoreForm));
