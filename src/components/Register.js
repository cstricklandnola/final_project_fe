import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './Register.css'
const Register = (props) => {
  const [user, setUser] = useState("");

  const { setAuthorized, loggedIn, setLoggedIn } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
        if (result.message === "thank you for signing up") {
          alert("Registered.");
          setAuthorized(result.token);
          setLoggedIn(result);
        } else {
          alert("Failed.");
        }
      })
      .catch(console.error);
  };
  if (loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
      <div className="form-content">
        <form className="form" onSubmit={handleSubmit}>
          <h1>
            Add to your Art Collection today!
          </h1>
          <h2>Create an account by filling out
            the information below.</h2>
          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="Username"
              id='username'
              type="text"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="Email"
              type="email"
              id='email'
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="Password"
              type="password"
              id='password'
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              id='firstName'
              required
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="form-input"
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              id='lastName'
              required
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="form-input"
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="address" className="form-label">
             Address
            </label>
            <input
              name="address"
              type="text"
              id='address'
              required
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="form-input"
              placeholder="Enter your address"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="city" className="form-label">
             City
            </label>
            <input
              name="city"
              type="text"
              id='city'
              required
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              className="form-input"
              placeholder="Enter your city"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="postalCoade" className="form-label">
             Postal Code
            </label>
            <input
              name="postalCode"
              type="text"
              id='postalCode'
              required
              onChange={(e) => setUser({ ...user, postal: e.target.value })}
              className="form-input"
              placeholder="Enter your Postal Code"
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="phone" className="form-label">
             Phone
            </label>
            <input
              name="phone"
              type="text"
              id='phone'
              required
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="form-input"
              placeholder="Enter your phone number"
            />
          </div>
          <Button id="button" type="submit">submit</Button>
        </form>
      </div>
      </>
    );
  }
};

export default Register;
