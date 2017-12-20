import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <Menu stackable>
            <Menu.Item>
              <img
                src="https://i3.silhcdn.com/3/i/shapes/lg/1/2/d8521.jpg"
                alt="PopChores"
                style={{ marginRight: "1em" }}
              />
              <strong>PopChores</strong>
            </Menu.Item>

            <Menu.Item
              name="profile"
              active={this.props.activeItem === "profile"}
              onClick={this.props.handleItemClick}
            >
              My Profile
            </Menu.Item>

            <Menu.Item
              name="household"
              active={this.propsactiveItem === "household"}
              onClick={this.props.handleItemClick}
            >
              Household
            </Menu.Item>
            <Menu.Item
              name="sign-out"
              onClick={this.props.handleItemClick}
              active={this.propsactiveItem === "sign-out"}
              position="right"
            >
              Sign-out
            </Menu.Item>
          </Menu>
        ) : (
          <Menu stackable>
            <Menu.Item>
              <img
                src="https://i3.silhcdn.com/3/i/shapes/lg/1/2/d8521.jpg"
                alt="PopChores"
                style={{ marginRight: "1em" }}
              />
              <strong>PopChores</strong>
            </Menu.Item>
            <Menu.Item
              name="sign-in"
              active={this.propsactiveItem === "sign-in"}
              onClick={this.props.handleItemClick}
              position="right"
            >
              Sign-in
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    loggedIn: state.users.loggedIn
  };
};

export default connect(mapStateToProps, null)(Navbar);
