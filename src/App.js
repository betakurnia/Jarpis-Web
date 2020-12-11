import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateRouteAdmin from "./utils/PrivateRouteAdmin";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/userAction";

// components
import Login from "./components/molecules/Login";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/pages/Dashboard";
import Announcment from "./components/pages/Announcment";
import Major from "./components/pages/Major";
import Admins from "./components/pages/Admins";
import AnnouncementUpdate from "./components/pages/AnnouncementUpdate";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Route path="/">
            <Navbar />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
          <Container>
            <PrivateRoute component={Dashboard} path="/dashboard" />

            <Route path="/pengumuman">
              <Announcment />
            </Route>
            <PrivateRoute component={Major} path="/mata-pelajaran/:id" exact />
            <PrivateRouteAdmin component={Admins} path="/admin" exact />
            <PrivateRouteAdmin
              component={AnnouncementUpdate}
              path="/admin/pengumuman/:id"
            />
          </Container>
          <Route path="/">
            {" "}
            <Footer />
          </Route>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
