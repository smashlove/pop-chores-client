import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Input
} from "semantic-ui-react";

class CreateUser extends Component {
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
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                />{" "}
                <Form.Input
                  fluid
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
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

export default withRouter(connect(mapStateToProps, null)(CreateUser));
