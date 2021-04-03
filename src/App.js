import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/globals/Navigation";
import Footer from "./components/globals/Footer";
import Landing from "./components/podcasts/SinglePodcast";
import SingleGuest from "./components/guests/SingleGuest";
import Dashboard from "./components/dashboard/Dashboard";
import theme from "./theme";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AddGuest from "./components/guests/AddGuest";
import Guests from "./components/guests/Guests";
import Podcasts from "./components/podcasts/Podcasts";
import Settings from 'components/settings/Settings'
import RedirectRoute from "./utils/RedirectRoute";
import PrivateRoute from "./utils/PrivateRoute";
import styled from "@emotion/styled";

const BackgroundShape = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    background: #19c39c09;
    top: 0;
    width: 100%;
    height: 400px;
    z-index: -1;
    left: 0;
    clip-path: polygon(0 0, 89% 0, 54% 8%, 38% 29%, 30% 15%, 0 55%);
    height: 100%;
  }

  &::after {
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
    <ChakraProvider resetCSS theme={theme}>
      <BackgroundShape />
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Podcasts} />
          <Route exact path="/guests/" component={Guests} />
          <Route exact path="/settings/" component={Settings} />
          <Route exact path="/podcasts/:podId/" component={Landing} />
          <Route
            exact
            path="/guests/:id"
            component={SingleGuest}
          />
          <PrivateRoute
            exact
            path="/dashboard/"
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path="/podcasts/:podId/add-guest/"
            component={AddGuest}
          />
          <RedirectRoute exact path="/auth/signup/" component={SignUp} />
          <RedirectRoute exact path="/auth/login/" component={Login} />
        </Switch>

        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
