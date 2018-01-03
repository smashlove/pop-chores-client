import React, { Component } from "react";
import { connect } from "react-redux";

class ChartView extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    state: state
  };
};

export default connect(mapStateToProps, null)(ChartView);
