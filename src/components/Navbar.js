import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <Menu stackable>
            <Menu.Item>
              <img src="#" />
            </Menu.Item>

            <Menu.Item
              name="profile"
              active={this.props.activeItem === "my-profile"}
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
            >
              Sign-out
            </Menu.Item>
          </Menu>
        ) : (
          <Menu stackable>
            <Menu.Item
              name="sign-in"
              active={this.propsactiveItem === "sign-in"}
              onClick={this.props.handleItemClick}
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
