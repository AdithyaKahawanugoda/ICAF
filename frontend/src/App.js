import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RegistrationScreen from "./screens/RegistrationScreen";
import AdministrationLogin from "./screens/AdministrationLoginScreen";

import AdminDashboard from "./screens/AdminDashboard";
import EditorDashboard from "./screens/EditorDashboard";
import ReviewerDashboard from "./screens/ReviewerDashboard";

const App = () => {
  return (
    <BRouter>
      <Header />
      <main className="page-body-content">
        <Switch>
          <Route exact path="/registration" component={RegistrationScreen} />
        </Switch>
        <Switch>
          <Route exact path="/login/admin" component={AdministrationLogin} />
        </Switch>
        <Switch>
          <Route exact path="/profile/admin" component={AdminDashboard} />
        </Switch>
        <Switch>
          <Route exact path="/profile/editor" component={EditorDashboard} />
        </Switch>
        <Switch>
          <Route exact path="/profile/reviewer" component={ReviewerDashboard} />
        </Switch>
      </main>
      <Footer />
    </BRouter>
  );
};

export default App;
