import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  };

  handleCreate = () => {
    this.props.history.push(`/create`);
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
            <Header as="h2" color="teal" textAlign="center">
              {/* <Image src="#" />*/} Login to your account
            </Header>
            <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a onClick={this.handleCreate}>Create an Account</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withRouter(connect(mapStateToProps, actions)(Login));
