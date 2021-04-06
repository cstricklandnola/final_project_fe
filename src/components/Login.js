import React, { useState } from "react";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  const [user, setUser] = useState("");
  const {
    setAuthorized,
    setCurrentUser,
    loggedIn,
    setLoggedIn,
    setAdmin,
  } = props;

  function helperHandleSubmit(e) {
    setUser({ ...user, password: e.target.value });
    setCurrentUser(user.username);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("https://fitnesstrac-kr.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "you're logged in!") {
          alert(result.message);
          setAuthorized(result.token);
          setLoggedIn(result.token);
          setAdmin(result.token);
          storeToken(result.token);
        } else {
          alert(result.message);
        }
      })
      .catch(console.error);
  };
  if (loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <h1> Login:</h1>
        <label>Username:</label>
        <input
          name="Username"
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => helperHandleSubmit(e)}
        />
        <Button type="submit">submit</Button>
      </form>
    );
  }
};

export default Login;
