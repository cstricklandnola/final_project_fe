import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ShoppingCart = (props) => {
  const userKey = document.cookie;
  const { products, setProducts, guestCart, setGuestCart } = props;
  const [deletedItems, setDeletedItems] = useState(0);

  const [shoppingCart, setShoppingCart] = useState("");
  

  

  const handleSubmitRemoveFromCart = async (serialno) => {
    try {
      setDeletedItems(true);

      axios

        .delete(
          `https://intense-lowlands-29407.herokuapp.com/api/shopping_cart/${serialno}`
        )
        .then((response) => console.log(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitOrder = async (item) => {
    try {
      alert("We are submitting the order.");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      alert("We are deleting your cart.");
      console.log(orderId);
      axios
        .delete(
          `https://intense-lowlands-29407.herokuapp.com/api/orders/${orderId}`
        )
        .then((response) => console.log(response.data));
      setShoppingCart("redirect");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    setDeletedItems(false);
    axios
      .get(
        `https://intense-lowlands-29407.herokuapp.com/api/shopping_cart/${userKey}`
      )
      .then((response) => setShoppingCart(response.data))
      .then(console.log(shoppingCart));
  }, [deletedItems]);

  let price = 0;
  ///Math for pricing.

  if (shoppingCart[0] === undefined) {
    return (
      <>
        <h1>Welcome to Your Shopping Cart:</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else if (shoppingCart === "redirect") {
    
    return <Redirect to="/listings" />;
  } else {
    
    shoppingCart.forEach((item) => {
      //This removes the $ from the price key.
      var g = item.price;
      g = g.replace(/\$/g, "");
      g = parseFloat(g);
      price = price + g * item.quantity;
    });
    let tempVar = []

  
  let tempCart = shoppingCart
  let finalCart = []
  
  

  if(tempCart[0]?.productId === undefined){
  console.log ("NOPE!")}
  else {
    //This goes through the cart and creates a new object that adds an accumulator for the quantity
    //anytime that the id is repeated.
    finalCart = Object.values(tempCart.reduce((acc, v) => {
      if (!acc[v.id]) {
          acc[v.id] = {id: v.id, quantity: 0, price: v.price, name: v.name};
      }
      acc[v.id].quantity += v.quantity;
      return acc;
   }, {}));
    console.log(finalCart)}


  


  

    return (
      <div>
        <h1>Welcome to Your Shopping Cart:</h1>
        <h3>This is waiting for the back end to be finished to be fancy.</h3>
        <div className="results"></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Product Name</th>
              <th>Count</th>
              <th>Price</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            {finalCart.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>

                <td>
                  <Button
                    type="submit"
                    onClick={() => handleSubmitRemoveFromCart(item.serialno)}
                  >
                    Remove Item
                  </Button>{" "}
                </td>
              </tr>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th>Total Price:</th>
              <th>${price.toFixed(2)}</th>
              <th>
                {" "}
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => handleSubmitOrder()}
                >
                  Check Out
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => handleDeleteOrder(shoppingCart[0].orderId)}
                >
                  Delete Order
                </Button>
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
};

export default ShoppingCart;
