import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Image, Container } from "semantic-ui-react";

import { connect } from "react-redux";

class UserProfile extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.households);
    return (
      <Container>
        <Image src={this.props.user.profile_pic} size="medium" />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    households: state.households,
    user: state.users
  };
};

export default withRouter(connect(mapStateToProps, null)(UserProfile));
