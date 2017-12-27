import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../actions/index";

import { connect } from "react-redux";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Dropdown
} from "semantic-ui-react";

class CreateUser extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      household: "",
      household_action: "Join",
      household_id: "",
      results: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = e => {
    this.setState({ household: e.target.value }, () =>
      this.setState(
        {
          results: this.props.households.households.filter(household =>
            household.name.toLowerCase().includes(this.state.household)
          )
        },
        this.changeAction
      )
    );
  };

  changeAction = () => {
    console.log(this.state.results.length);
    if (this.state.results.length === 0) {
      this.setState({ household_action: "Create" });
    } else {
      this.setState({
        household_action: "Join",
        household_id: this.state.results[0].id
      });
    }
  };

  // handleDropdown = (e, data) => {
  //   this.setState({ household_action: data.value.toLowerCase() });
  // };

  render() {
    const options = [
      { text: "Join", key: 0, value: "Join" },
      { text: "Create", key: "create", value: "Create" }
    ];

    return (
      <Segment attached="bottom">
        <div className="create-form">
          <Grid textAlign="center" style={{ height: "10%" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Create an Account
              </Header>
              <Form
                size="large"
                onSubmit={() =>
                  this.props.createUser(this.state, this.props.history)
                }
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    name="first_name"
                    placeholder="First Name"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                  />{" "}
                  <Form.Input
                    fluid
                    name="last_name"
                    placeholder="Last Name"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.last_name}
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                  <Form.Input
                    action={
                      <Dropdown
                        button
                        basic
                        floating
                        options={options}
                        onChange={this.handleDropdown}
                        value={this.state.household_action}
                        name="household_action"
                      />
                    }
                    name="household"
                    onChange={this.handleSearch}
                    icon="search"
                    iconPosition="left"
                    placeholder="Search households..."
                  />
                  <Button color="teal" fluid size="large">
                    Submit
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    households: state.households
  };
};

export default withRouter(connect(mapStateToProps, actions)(CreateUser));
