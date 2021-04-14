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
    currentUser,


  } = props;

  let dataDump = {}

  function helperHandleSubmit(e) {
    setUser({ ...user, password: e.target.value });
    
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    fetch("https://intense-lowlands-29407.herokuapp.com/api/customers/login", {
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
        
        if (result.message === "you're logged in! ") {
          dataDump = result.customer
          document.cookie = result.customer.id
          setCurrentUser(dataDump)
          
          alert(result.message);
          
          setAuthorized(result.token);
          setLoggedIn(result.token);
          setAdmin(result.customer.isAdmin);
          storeToken(result.token);
          
          


        } else {
          alert(result.message);
        }
        
      })
     
      .catch(console.error);
  };
  if (loggedIn) {
    console.log(currentUser)
    return <Redirect to="/listings" />;
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
