import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Profile from "./components/pages/Profile";
import Announcment from "./components/pages/Announcment";
import Major from "./components/pages/Major";
import Pengumuman from "./components/pages/Pengumuman";
import Admins from "./components/pages/Admins";
import RecapitulationValue from "./components/pages/RecapitulationValue";
import RecapitulationStudent from "./components/pages/RecapitulationStudent";
import Recapitulation from "./components/pages/Recapitulation";
import Present from "./components/pages/Present";
import Theory from "./components/pages/Theory";
// import CKEditor from "./components/atoms/CKEditor";
import Register from "./components/molecules/Register";
import Exams from "./components/pages/Exams";
import ExamsStudent from "./components/pages/ExamsStudent";
import AnnouncementUpdate from "./components/pages/AnnouncementUpdate";
// import CreateTemplate from "../../molecules/CreateTemplate";

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
            <PrivateRoute component={Profile} path="/profile" />
            <PrivateRoute component={RecapitulationStudent} path="/nilai" />
            <Route path="/pengumuman">
              <Announcment />
            </Route>
            <PrivateRoute component={Major} path="/mata-pelajaran/:id" exact />

            <Switch>
              <PrivateRoute
                component={Present}
                path="/mata-pelajaran/presensi/:id"
                exact
              />
              <PrivateRoute
                component={ExamsStudent}
                path="/mata-pelajaran/:ujian/:id"
                exact
              />
            </Switch>
            <PrivateRoute component={Present} path="/presensi/:id" exact />
            <PrivateRoute component={Theory} path="/guru/materi/:i/:id" exact />
            <PrivateRoute
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
            <PrivateRoute
              component={RecapitulationValue}
              path="/guru/rekapitulasi/:ujian/:id"
              exact
            />
            <PrivateRouteAdmin
              component={Pengumuman}
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
