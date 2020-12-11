import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "./is-empty";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isEmpty(user.isAuthenticated) === true ? (
          <Component {...props} />
        ) : (
          // console.log(!isEmpty(user.isAuthenticated) === true)
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
