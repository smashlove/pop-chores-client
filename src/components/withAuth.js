// import React from "react";
// import { Redirect } from "react-router-dom";
// import * as actions from "../actions/index";
// import { connect } from "react-redux";
//
// const withAuth = WrappedComponent => {
//   return class extends React.Component {
//     componentDidMount() {
//       if (localStorage.getItem("token")) {
//         this.props.checkUser();
//       }
//     }
//
//     render() {
//       if (this.props.loggedIn) {
//         return <WrappedComponent {...this.props} />;
//       } else {
//         return <Redirect to="/login" />;
//       }
//     }
//   };
// };
//
// const mapStateToProps = state => {
//   return {
//     loggedIn: this.state.loggedIn
//   };
// };
//
// export default connect(mapStateToProps, actions)(withAuth);

import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return this.props.loggedIn ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  };
};

export default withAuth;
