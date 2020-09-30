import React from "react";
import "./App.css";
import { ThemeProvider } from "@chakra-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import SingleGuest from "./components/SingleGuest";
import VotingForm from "./components/VotingForm";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import theme from "./theme";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import AddGuest from "./components/AddGuest";
import AllGuest from "./components/AllGuests";
import RedirectRoute from "./utils/RedirectRoute";
import PrivateRoute from "./utils/PrivateRoute";
import styled from "@emotion/styled";

// fuse.js

const BackgroundShape = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    background: #19c39c07;
    top: 0;
    width: 100%;
    height: 400px;
    z-index: -1;
    left: 0;
    clip-path: polygon(0 0, 89% 0, 54% 8%, 38% 29%, 30% 15%, 0 55%);
    height: 100%;
  }

  &&::after {
    content: "";
    position: absolute;
    background: #19c39c07;
    bottom: 0;
    width: 100%;
    height: 400px;
    z-index: -1;
    right: 0;
    clip-path: polygon(
      57% 73%,
      92% 12%,
      100% 28%,
      100% 100%,
      20% 100%,
      46% 56%
    );
    height: 100%;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundShape />
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/guests/" component={AllGuest} />
          <Route exact path="/guest/:id" component={SingleGuest} />
          <PrivateRoute exact path="/vote/" component={VotingForm} />
          <PrivateRoute exact path="/dash/" component={Dashboard} />
          <PrivateRoute exact path="/add-guest/" component={AddGuest} />
          <RedirectRoute exact path="/auth/signup/" component={SignUp} />
          <RedirectRoute exact path="/auth/login/" component={Login} />
        </Switch>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
