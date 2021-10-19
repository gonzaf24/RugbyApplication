import React, { useContext } from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Router, Redirect } from "@reach/router";
import { Context } from "./Context";
import { Login } from "./pages/Login";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Inicio } from "./pages/Inicio";
import { Register } from "./pages/Register";
import { Recover } from "./pages/Recover";
import { Confirmation } from "./pages/Confirmation";
import { NotFound } from "./pages/NotFound";
import { Payment } from "./pages/Payment";
import { Club } from "./pages/plans/Club";
import { ClubRegular } from "./pages/plans/ClubRegular";
import { ClubPlus } from "./pages/plans/ClubPlus";
import { Agent } from "./pages/plans/Agent";
import { Player } from "./pages/plans/Player";
import { Plans } from "./pages/plans/Plans";

import { PlayerLevel } from "./pages/player/PlayerLevel";
import { PlayerInfo } from "./pages/player/PlayerInfo";
import { ClubInfo } from "./pages/club/ClubInfo";
import { AgentInfo } from "./pages/agent/AgentInfo";

import { Home as PlayerHome } from "./pages/player/Home";
import { Home as ClubHome } from "./pages/club/Home";
import { Home as AgentHome } from "./pages/agent/Home";

import { Search as PlayerSearch } from "./pages/player/Search";
import { Search as ClubSearch } from "./pages/club/Search";
import { Search as AgentSearch } from "./pages/agent/Search";

import { Messages } from "./pages/Messages";

import { Booked } from "./pages/Booked";
import { AdmPosts } from "./pages/AdmPosts";

import { Profile as PlayerProfile } from "./pages/player/Profile";
import { Profile as ClubProfile } from "./pages/club/Profile";
import { Profile as AgentProfile } from "./pages/agent/Profile";

import { PlayerSheet } from "./pages/publicProfiles/PlayerSheet";
import { AgentSheet } from "./pages/publicProfiles/AgentSheet";
import { ClubSheet } from "./pages/publicProfiles/ClubSheet";

import "@babel/polyfill";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c3c8ca",
    },
    secondary: {
      main: "#2c3235" /*  #e91e63 */,
    },
    success: {
      main: "#28a499",
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: "#28a499 !important",
      },
    },
    MuiTab: {
      root: {
        "&$selected": { color: "#28a499 !important" },
      },
    },
    MuiRadio: {
      root: {
        "&$checked": {
          color: "#28a499 !important",
        },
      },
    },
  },
});

export const App = () => {
  const { isAuth, notificar } = useContext(Context);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle></GlobalStyle>
        <Router>
          <NotFound default />
          <NotFound path="/notFound/:type" />
          <Inicio path="/" />
          <Inicio path="/:id" />
          <Login path="/login" />
          <Login path="/login/:id" />
          <Login path="/login/:id/:id" />
          <Register path="/register" />
          <Recover path="/recover" />
          <Confirmation path="/confirmation/:id" />

          {!isAuth && <Redirect from="/plans" to="/login" />}
          {!isAuth && <Redirect from="/plans/club/regular" to="/login" />}
          {!isAuth && <Redirect from="/plans/club/plus" to="/login" />}
          {!isAuth && <Redirect from="/plans/club" to="/login" />}
          {!isAuth && <Redirect from="/plans/agent" to="/login" />}
          {!isAuth && <Redirect from="/plans/player" to="/login" />}
          {!isAuth && <Redirect from="/payment/:id" to="/login/:id" />}
          {!isAuth && (
            <Redirect from="/payment/:id/:clubType" to="/login/:id/:clubType" />
          )}
          {!isAuth && <Redirect from="/home/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/player/level" to="/login" />}
          {!isAuth && (
            <Redirect from="/player/info/:level" to="/login/:level" />
          )}
          {!isAuth && <Redirect from="/club/info" to="/login" />}
          {!isAuth && <Redirect from="/agent/info" to="/login" />}

          {!isAuth && <Redirect from="/player/home/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/club/home/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/agent/home/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/player/search/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/club/search/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/agent/search/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/player/profile/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/club/profile/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/agent/profile/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/messages/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/booked/:id" to="/login/:id" />}

          {!isAuth && <Redirect from="/adm/posts/:id" to="/login/:id" />}

          {!isAuth && (
            <Redirect
              from="/playerSheet/:playerUID/:agentUID"
              to="/login/:playerUID/:agentUID"
            />
          )}
          {!isAuth && (
            <Redirect from="/playerSheet/:playerUID" to="/login/:playerUID" />
          )}
          {!isAuth && <Redirect from="/agentSheet/:id" to="/login/:id" />}
          {!isAuth && <Redirect from="/clubSheet/:id" to="/login/:id" />}

          <PlayerLevel path="/player/level" />
          <PlayerInfo path="/player/info/:level" />
          <ClubInfo path="/club/info" />
          <AgentInfo path="/agent/info" />

          <ClubHome path="/club/home/:id" />
          <AgentHome path="/agent/home/:id" />
          <PlayerHome path="/player/home/:id" />

          <ClubSearch path="/club/search/:id" />
          <AgentSearch path="/agent/search/:id" />
          <PlayerSearch path="/player/search/:id" />

          <ClubProfile path="/club/profile/:id" />
          <AgentProfile path="/agent/profile/:id" />
          <PlayerProfile path="/player/profile/:id" />

          <Messages path="/messages/:id" />

          <Booked path="/booked/:id" />

          <AdmPosts path="/adm/posts/:id" />

          <Payment path="/payment/:id/:clubType" />
          <Payment path="/payment/:id" />

          <Plans path="/plans" />

          <Club path="/plans/club" />
          <ClubRegular path="/plans/club/regular" />
          <ClubPlus path="/plans/club/plus" />

          <Agent path="/plans/agent" />
          <Player path="/plans/player" />

          <PlayerSheet path="/playerSheet/:playerUID/:agentUID" />
          <PlayerSheet path="/playerSheet/:playerUID" />
          <AgentSheet path="/agentSheet/:id" />
          <ClubSheet path="/clubSheet/:id" />
        </Router>
      </ThemeProvider>
    </>
  );
};
