import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

class Household extends Component {
  render() {
    console.log(this.props);
    return <div>Household</div>;
  }
}

const mapStateToProps = state => {
  return {
    households: state.households
  };
};

export default connect(mapStateToProps, null)(Household);
