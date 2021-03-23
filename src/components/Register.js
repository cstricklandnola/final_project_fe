import React, { useState } from "react";
import {Redirect} from "react-router-dom"
const Register = (props) => {
  const [user, setUser] = useState("");

  const { setAuthorized, loggedIn, setLoggedIn } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log (user.username)
    console.log (user.password)
    // fetch(
    //   "https://fitnesstrac-kr.herokuapp.com/api/users/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username:user.username, password:user.password }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);

    //     if (result.message === "you're signed up!") {
    //       alert("Registered.");
    //       setAuthorized(result.token)
    //       setLoggedIn(result.token);
    //     } else {
    //       alert(result.message);
    //     }
    //   })
    //   .catch(console.error);
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
        />
        <label>Email:</label>
        <input
          name="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">submit</button>
      </form>
    );
  }    
};

export default Register;


