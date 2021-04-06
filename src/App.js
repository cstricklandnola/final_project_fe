import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken } from "./auth";
import { fetchUserData, fetchAllActivites } from "./api";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";

import {
  CreateListing,
  Home,
  Login,
  Listings,
  ManageUsers,
  ManageListings,
  ManageSelectedUser,
  ManageSelectedListing,
  OrdersListing,
  Register,
  ShoppingCart,
} from "./components";

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  //Current User = Current User Data loaded in on log in.
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [admin, setAdmin] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  // This is used between ManageUser and ManageSelectedUser.
  const [selectedListing, setSelectedListing] = useState("");
  // This is used between ManangeListings and ManageSelectedListing to push data.
  const [orderStarted, setOrderStarted] = useState("");
  


  // useEffect(async () => {
  //   if (loggedIn) {
  //       try {
  //           const data = await fetchUserData();
  //           setCurrentUser(data.username);
  //           const grabbedActivities = await fetchAllActivites();
  //           setActivities(grabbedActivities);

  //       } catch (error) {
  //           console.error(error);
  //       }
  //   }
  // }, [loggedIn])

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/listings">Listings</Nav.Link>
            {!admin ? (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="/ManageUsers">
                  Manage Users
                </NavDropdown.Item>
                <NavDropdown.Item href="/ManageListings">
                  Manage Listing
                </NavDropdown.Item>
                <NavDropdown.Item href="/CreateListing">
                  Create Listing
                </NavDropdown.Item>
                <NavDropdown.Item href="/OrdersListing">
                  View Orders
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            <Nav.Link href="/ShoppingCart">Shopping Cart</Nav.Link>
          </Nav>

          <Form inline>
            {!loggedIn ? <Nav.Link href="/Login">Login</Nav.Link> : null}
            {!loggedIn ? (
              <Nav.Link href="/Register" to="/Register">
                Register
              </Nav.Link>
            ) : null}
            {loggedIn ? (
              <Link
                className="Link"
                onClick={() => {
                  clearToken();

                  setLoggedIn(null);
                  setAuthorized(null);
                  setCurrentUser(null);
                }}
                to="/"
              >
                Log Out
              </Link>
            ) : null}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              orderStarted={orderStarted}
              setOrderStarted={setOrderStarted}
            />
          </Route>
          <Route path="/ManageUsers">
            <ManageUsers
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
              setAuthorized={setAuthorized}
              authorized={authorized}
              admin={admin}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </Route>
          <Route path="/Login">
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
              setAuthorized={setAuthorized}
              authorized={authorized}
              setAdmin={setAdmin}
            />
          </Route>
          <Route path="/Register">
            <Register
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/Listings">
            <Listings
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              orderStarted={orderStarted}
              setOrderStarted={setOrderStarted}
            />
          </Route>
          <Route path="/CreateListing">
            <CreateListing
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
            />
          </Route>
          <Route path="/ShoppingCart">
            <ShoppingCart
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/ManageListings">
            <ManageListings
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
            />
          </Route>

          <Route path="/ManageSelectedUser">
            <ManageSelectedUser
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              selectedUser={selectedUser}
            />
          </Route>
          <Route path="/ManageSelectedListing">
            <ManageSelectedListing
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              selectedListing={selectedListing}
            />
          </Route>

          <Route path="/OrdersListing">
            <OrdersListing
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
            />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
