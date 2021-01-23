import React from "react";
import "./App.css";

import { Container } from "@material-ui/core";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateRouteTeacher from "./utils/PrivateRouteTeacher";
import PrivateRouteAdmin from "./utils/PrivateRouteAdmin";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { setCurrentUser, logoutUser } from "./redux/actions/userAction";

import Login from "./components/molecules/Login";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Announcment from "./components/pages/Announcment";
import Major from "./components/pages/Major";
import RecapitulationValue from "./components/pages/RecapitulationValue";
import RecapitulationStudent from "./components/pages/RecapitulationStudent";
import Recapitulation from "./components/pages/Recapitulation";
import Presence from "./components/pages/Presence";
import Theory from "./components/pages/Theory";
import Register from "./components/pages/Register";
import Exams from "./components/pages/Exams";
import ExamsStudent from "./components/pages/ExamsStudent";
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
          <Container maxWidth="lg">
            <PrivateRoute component={Dashboard} path="/dashboard" />
            <PrivateRoute component={Profile} path="/profile" />
            <PrivateRoute component={RecapitulationStudent} path="/nilai" />
            <Route path="/pengumuman" exact>
              <Announcment />
            </Route>
            <PrivateRoute component={Major} path="/mata-pelajaran/:id" exact />

            <Switch>
              <PrivateRoute
                component={Presence}
                path="/mata-pelajaran/presensi/:id"
                exact
              />
              <PrivateRoute
                component={ExamsStudent}
                path="/mata-pelajaran/:ujian/:id"
                exact
              />
            </Switch>
            <PrivateRoute component={Presence} path="/presensi/:id" exact />
            <PrivateRouteTeacher
              component={Theory}
              path="/guru/materi/:numberOfTheory/:id"
              exact
            />
            <PrivateRouteTeacher
              component={Exams}
              path="/guru/ujian/:ujian/:id"
              exact
            />
            <PrivateRouteAdmin
              component={Register}
              path="/admin/register"
              exact
            />
            <PrivateRouteAdmin
              component={Recapitulation}
              path="/admin/rekapitulasi"
              exact
            />
            <PrivateRouteTeacher
              component={RecapitulationValue}
              path="/guru/rekapitulasi/:ujian/:id"
              exact
            />
            <PrivateRouteAdmin
              component={AnnouncementUpdate}
              path="/admin/pengumuman"
              exact
            />
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
