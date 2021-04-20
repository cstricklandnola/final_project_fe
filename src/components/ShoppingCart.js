import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getToken } from "../auth";
const token = getToken();

const ShoppingCart = (props) => {
  const userKey = document.cookie;
  let finalCart = [];
  const [deletedItems, setDeletedItems] = useState(0);

  const [shoppingCart, setShoppingCart] = useState("");

  const handleSubmitRemoveFromCart = async (serialno) => {
    try {
      setDeletedItems(true);

      axios.delete(
        `https://intense-lowlands-29407.herokuapp.com/api/shopping_cart/${serialno}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitOrder = async () => {
    try {
      alert("We are submitting the order.");
      console.log("Attention below.");
      console.log(finalCart);
      finalCart.forEach((product) => {
        try {
          axios.post(
            "https://intense-lowlands-29407.herokuapp.com/api/orders/checkout",
            {
              orderId: 5,
              productId: 2,
              username: localStorage.getItem("customerUserName"),
              email: localStorage.getItem("customerEmail"),
              status: "submitted",
              quantity: product.quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      alert("We are deleting your cart.");

      axios.delete(
        `https://intense-lowlands-29407.herokuapp.com/api/orders/${orderId}`
      );

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
      .then((response) => setShoppingCart(response.data));
  }, [deletedItems]);

  let price = 0;
  ///Math for pricing.

  if (shoppingCart[0] === undefined) {
    return (
      <>
        <h1>Welcome to Your Shopping Cart:</h1>
        <h3>Your cart is currently empty, or being fetched.</h3>
        <img src="https://aestheticsforbirds.files.wordpress.com/2020/03/artworld.jpg?w=463&h=349"></img>
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

    let tempCart = shoppingCart;

    if (tempCart[0]?.productId === undefined) {
    } else {
      //This goes through the cart and creates a new object that adds an accumulator for the quantity
      //anytime that the id is repeated.
      finalCart = Object.values(
        tempCart.reduce((acc, v) => {
          if (!acc[v.id]) {
            acc[v.id] = {
              id: v.id,
              productId: v.productId,
              quantity: 0,
              price: v.price,
              name: v.name,
              serialno: v.serialno,
            };
          }
          acc[v.id].quantity += v.quantity;
          return acc;
        }, {})
      );
    }

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
