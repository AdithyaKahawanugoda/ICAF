import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RegistrationScreen from "./screens/RegistrationScreen";
import AdministrationLogin from "./screens/AdministrationLoginScreen";

import ResearcherProfile from "./screens/ResearcherProfile";
import conferencecover from "./screens/ConferenceCover";
import userGuide from "./screens/Userguide.js";

import Resource from "./screens/Resource";
import Workshop from "./screens/Workshop";

import WorkshopCondctorProfile from "./screens/WorkshopConductorProfile";
import Research from './screens/Research';

import EditorDashboard from "./screens/EditorDashboard";
import AttendeeProfile from "./screens/AttendeeScreen";

import AdminDashboard from "./screens/AdminDashboard";
import ReviewerDashboard from "./screens/ReviewerDashboard";
import Home from "./screens/Home";
import Templates from "./screens/Templates";

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
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>

        <Switch>
          <Route exact path="/workshop/:id" component={Workshop} />
        </Switch>

        <Switch>
          <Route
            exact
            path="/profile/wconductor"
            component={WorkshopCondctorProfile}
          />
        </Switch>
        <Switch>
          <Route exact path="/resources" component={Resource} />
        </Switch>

        <Switch>
          <Route
            exact
            path="/profile/researcher"
            component={ResearcherProfile}
          />
        </Switch>
        <Switch>
          <Route exact path="/conference" component={conferencecover} />
        </Switch>

        <Switch>
          <Route exact path="/profile/attendee" component={AttendeeProfile} />
        </Switch>

        <Switch>
        <Route exact path="/research/:id" component={Research} /> 
        </Switch>


        <Switch>
        <Route exact path="/templates" component={Templates} /> 
        </Switch>

        
        
        <Switch>
        <Route exact path="/userguide" component={userGuide} /> 
        </Switch>
      </main>
      <Footer />
    </BRouter>
  );
};

export default App;
