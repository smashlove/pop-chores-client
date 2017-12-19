import React, { Component } from "react";
import withAuth from "./withAuth";
import Household from "./Household";

class Container extends Component {
  render() {
    return (
      <div>
        <Household />
      </div>
    );
  }
}

export default Container;
