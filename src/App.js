import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken } from "./auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

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
  const [currentUser, setCurrentUser] = useState();
  //Current User = Current User Data loaded in on log in.
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [admin, setAdmin] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  // This is used between ManageUser and ManageSelectedUser.
  const [selectedListing, setSelectedListing] = useState("");
  // This is used between ManangeListings and ManageSelectedListing to push data.
  const [orderStarted, setOrderStarted] = useState("");

  const [products, setProducts] = useState([]);

  const [guestCart, setGuestCart] = useState([]);
  // Holds cart for User who isn't logged in.

  useEffect(() => {
    axios
      .get("https://intense-lowlands-29407.herokuapp.com/api/")
      .then((response) => setProducts(response.data));
  }, []);

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/listings">Listings</Nav.Link>
            {admin ? (
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
            <Nav.Link
              href="/ShoppingCart"
              currentUser={currentUser}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
            >
              Shopping Cart
            </Nav.Link>
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
                  document.cookie = 0;
                  console.log(document.cookie);
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
              products={products}
              currentUser={currentUser}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
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
              currentUser={currentUser}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
            />
          </Route>
          <Route path="/Register">
            <Register
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
            />
          </Route>
          <Route path="/Listings">
            <Listings
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              currentUser={currentUser}
              orderStarted={orderStarted}
              setOrderStarted={setOrderStarted}
              products={products}
              setProducts={setProducts}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
            />
          </Route>
          <Route path="/CreateListing">
            <CreateListing
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              currentUser={currentUser}
            />
          </Route>
          <Route path="/ShoppingCart">
            <ShoppingCart
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              products={products}
              setProducts={setProducts}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
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
              products={products}
              setProducts={setProducts}
              currentUser={currentUser}
            />
          </Route>

          <Route path="/ManageSelectedUser">
            <ManageSelectedUser
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              admin={admin}
              selectedUser={selectedUser}
              currentUser={currentUser}
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
