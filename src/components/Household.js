import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

class Household extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.households);
    return <div>house</div>;
  }
}

const mapStateToProps = state => {
  return {
    households: state.households
  };
};

export default withRouter(connect(mapStateToProps, null)(Household));
