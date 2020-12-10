import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Route path="/">
            <Navbar />
          </Route>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
