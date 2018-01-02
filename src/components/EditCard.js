import React, { Component } from "react";
import {
  Card,
  Image,
  Button,
  Icon,
  Label,
  Form,
  Dropdown
} from "semantic-ui-react";

class EditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chore_id: props.chore.chore_id,
      id: props.chore.id,
      title: props.chore.title,
      point_value: props.chore.point_value,
      description: "",
      image_url: props.chore.image_url
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDropdown = (e, data) => {
    this.setState({ point_value: data.value });
  };

  handleSubmit = type => {
    this.props.updateChore(
      this.state,
      this.props.user,
      type,
      this.props.history
    );
    this.props.edit();
  };

  render() {
    const options = [
      { key: 1, text: "5", value: 5 },
      { key: 2, text: "10", value: 10 },
      { key: 3, text: "15", value: 15 },
      { key: 4, text: "20", value: 20 }
    ];
    return (
      <Form onSubmit={() => this.handleSubmit("edit")}>
        <Card>
          <Card.Content>
            <Form.Input
              name="image_url"
              size="mini"
              placeholder="Image URL"
              onChange={this.handleChange}
              value={this.state.image_url}
            />
            <Image floated="left" size="small" src={this.state.image_url} />

            <Card.Header>
              <Form.Input
                name="title"
                size="mini"
                placeholder="Title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Card.Header>
            <Card.Meta>
              <Form.Input
                name="description"
                size="mini"
                placeholder={"Description"}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra>
            {"Points: "}
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
            <Label
              attached="top right"
              icon="delete"
              corner
              as="a"
              size="mini"
              onClick={this.props.edit}
            />
          </Card.Content>

          {this.props.delete !== "false" ? (
            <div className="ui two buttons">
              <Button
                basic
                color="red"
                onClick={() => this.handleSubmit("delete")}
              >
                <Icon name="delete" />Delete Chore
              </Button>{" "}
              <Button basic color="green" type="submit">
                <Icon name="check" />Submit Edit
              </Button>{" "}
            </div>
          ) : (
            <Button basic disabled>
              <Icon name="delete" />No edits while assigned
            </Button>
          )}
        </Card>
      </Form>
    );
  }
}

export default EditCard;
