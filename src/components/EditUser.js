import React, { Component } from "react";
import { Card, Image, Button, Icon, Label, Form } from "semantic-ui-react";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      username: props.user.username,
      status: props.user.status,
      profile_pic: props.user.profile_pic
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = type => {
    this.props.updateUser(this.state, this.props.user, type);
    this.props.edit();
  };

  render() {
    return (
      <Form onSubmit={() => this.handleSubmit("edit")}>
        <Card>
          <Image src={this.props.user.profile_pic} />
          <Form.Input
            size="mini"
            name="profile_pic"
            placeholder="Image URL"
            onChange={this.handleChange}
            value={this.state.profile_pic}
          />
          <Card.Content>
            <Form.Input
              size="mini"
              name="first_name"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.props.user.first_name}
            />
            <Form.Input
              size="mini"
              name="last_name"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.props.user.last_name}
            />
            <Form.Input
              size="mini"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={`@${this.props.user.username}`}
            />
            <Form.Input
              size="mini"
              name="status"
              placeholder="Status"
              onChange={this.handleChange}
              value={this.props.user.status}
            />
          </Card.Content>
          <Card.Content extra>
            <a>{this.props.user.points} Points</a>
          </Card.Content>{" "}
          <div className="ui two buttons">
            <Button
              basic
              color="red"
              onClick={() => this.handleSubmit("delete")}
            >
              <Icon name="delete" />Delete User
            </Button>{" "}
            <Button
              basic
              color="green"
              onClick={() => this.handleSubmit("edit")}
            >
              <Icon name="check" />Submit Edit
            </Button>{" "}
          </div>
        </Card>
        <Label
          attached="top right"
          icon="edit"
          corner
          as="a"
          size="mini"
          onClick={this.props.edit}
        />
      </Form>
    );
  }
}

export default EditUser;
