import React, { useEffect } from "react";
import { ClientContextProvider } from 'react-fetching-library';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import client from './api/client';
import Logs from "./logs";
import Login from "./login";
import useAuth from './auth';

function App() {
  useEffect(() => {
    document.title = "Artist Management";
  });

  const auth = useAuth();

  if (!auth.token || auth.isExpired) {
    return (
      <ClientContextProvider client={client}>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">Artist Management</Navbar.Brand>
          </Navbar>
          <Container fluid>
            <Switch>
              <Route path="/login">
                <Login callback={auth.saveToken} />
              </Route>
              <Route path="/">
              <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ClientContextProvider>
    );
  }

  return (
    <ClientContextProvider client={client}>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="/">Artist Management</Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Switch>
            <Route path="/logs">
              <Logs />
            </Route>
            <Route path="/">
              <Redirect
                to={{
                  pathname: "/logs"
                }}
              />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ClientContextProvider>
  );
}

export default App;
