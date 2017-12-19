import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
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
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a>Create an Account</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(CreateUser);
