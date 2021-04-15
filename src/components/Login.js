import React, { useState } from "react";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

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

  const guestCart = (JSON.parse(localStorage.getItem('cart')))
 
  let dataDump = {}


  const handleSubmitGuestCart = async (item) => {
    try {
      //Check state to see if an order has been started. If it hasn't been, start a new order. If it has been, add item.     
        
        axios.post ("https://intense-lowlands-29407.herokuapp.com/api/orders/",
        {orderId: document.cookie,
        productId: item.id,
        status: "Processing",
        quantity: "1",
        
        })
        .then((response) => console.log(response))

        
    
      
    } catch (error) {
      console.error(error);
    }
  };

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
          guestCart.guestCart.forEach(item => {
            handleSubmitGuestCart(item)
            
          });
        
          
          


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
