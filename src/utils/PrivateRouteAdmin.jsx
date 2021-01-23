import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "./is-empty";

const PrivateRouteAdmin = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isEmpty(user.isAuthenticated) &&
        (user.isAuthenticated.role === "admin") === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
