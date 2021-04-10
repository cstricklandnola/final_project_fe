import React, { useState } from "react";
import {Redirect} from "react-router-dom"
import Button from 'react-bootstrap/Button'
const Register = (props) => {
  const [user, setUser] = useState("");

  const { setAuthorized, loggedIn, setLoggedIn } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log (user.username)
    console.log (user.password)
    fetch(
      "https://intense-lowlands-29407.herokuapp.com/api/customers/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "you're signed up!") {
          alert("Registered.");
          setAuthorized(result.token)
          setLoggedIn(result.token);
        } else {
          alert(result.message);
        }
      })
      .catch(console.error);
  };
  if (loggedIn) {
    return <Redirect to="/" />
  }else{
    return (
      <form onSubmit={handleSubmit}>
        <h1> Registration:</h1>
        <label>Username:</label>
        <input
          name="Username"
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        /><p></p>
        <label>Email:</label>
        <input
          name="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        /><p></p>
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        /><p></p>
        <label>First Name:</label>
        <input
          name="firstName"
          required
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        /><p></p>
        <label>Last Name:</label>
        <input
          name="lastName"
          required
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        /><p></p>
        <label>Address:</label>
        <input
          name="address"
          required
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        /><p></p>
        <label>City:</label>
        <input
          name="city"
          required
          onChange={(e) => setUser({ ...user, city: e.target.value })}
        /><p></p>
        <label>Postal Code:</label>
        <input
          name="postalCode"
          required
          onChange={(e) => setUser({ ...user, postal: e.target.value })}
        /><p></p>
        <label>Phone:</label>
        <input
          name="phone"
          required
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        /><p></p>
        <Button type="submit">submit</Button>
      </form>
    );
  }    
};

export default Register;


