import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as actions from "../actions/index";

import { connect } from "react-redux";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Input,
  Dropdown
} from "semantic-ui-react";

class CreateUser extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="orange" textAlign="center">
              {/* <Image src="#" />*/} Create an Account
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
                {/* <Dropdown
                  placeholder="Select Household"
                  fluid
                  search
                  selection
                  options={this.props.households}
                /> */}
                <Button color="orange" fluid size="large">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    households: state.households
  };
};

export default withRouter(connect(mapStateToProps, actions)(CreateUser));
