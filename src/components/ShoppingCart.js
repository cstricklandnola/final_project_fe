import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

const handleSubmitRemoveFromCart = async (item) => {
  try {
    alert("ItemId: "+ item.itemId + " was removed from the cart.");
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
const handleDeleteOrder = async (item) => {
  try {
    alert("We are deleting your cart.");
  } catch (error) {
    console.error(error);
  }
};

const ShoppingCart = (props) => {
  const {currentUser} = props
  const [shoppingCart, setShoppingCart] = useState("");
  useEffect(async () => {
    console.log(currentUser)
    axios
      .get(`https://intense-lowlands-29407.herokuapp.com/api/shopping_cart/2`)
      .then((response) => setShoppingCart(response.data))
      .then(console.log(shoppingCart))
  }, []);

  //||****************************************************Delete whatever is contained in this ****************************************************||
  const dummyDatabase = [
    {
      itemId: 1,
      isActive: true,
      name: "First Item",
      description: "This is a description",
      cost: 10.99,
      featured: false,
      onHand: 20,
      keywords: ["car", "engine"],
      category: "cars",
      photos: [
        "http://placekitten.com/200/287",
        "http://placekitten.com/200/299",
        "http://placekitten.com/200/300",
      ],
      reviews: ["reviewId"],
    },
    {
      itemId: 2,
      isActive: true,
      name: "Second Item",
      description: "This is a second description",
      cost: 1.99,
      featured: false,
      onHand: 20,
      keywords: ["car", "engine"],
      category: "televisions",
      photos: [
        "http://placekitten.com/200/227",
        "http://placekitten.com/200/199",
        "http://placekitten.com/200/111",
      ],
      reviews: ["reviewId"],
    },
    {
      itemId: 3,
      isActive: true,
      name: "Third Item",
      description: "This is a second description",
      cost: 1.99,
      featured: false,
      onHand: 20,
      keywords: ["car", "engine"],
      category: "televisions",
      photos: [
        "http://placekitten.com/200/199",
        "http://placekitten.com/200/199",
        "http://placekitten.com/200/111",
      ],
      reviews: ["reviewId"],
    },
    {
      itemId: 4,
      isActive: true,
      name: "Fourth Item",
      description: "This is a second description",
      cost: 1.99,
      featured: false,
      onHand: 20,
      keywords: ["car", "engine"],
      category: "televisions",
      photos: [
        "http://placekitten.com/200/105",
        "http://placekitten.com/200/199",
        "http://placekitten.com/200/111",
      ],
      reviews: ["reviewId"],
    },
    {
      itemId: 5,
      isActive: true,
      name: "Fifth Item",
      description: "This is a second description",
      cost: 1.99,
      featured: false,
      onHand: 20,
      keywords: ["car", "engine"],
      category: "televisions",
      photos: [
        "http://placekitten.com/200/205",
        "http://placekitten.com/200/199",
        "http://placekitten.com/200/111",
      ],
      reviews: ["reviewId"],
    }
  ];

  

  const currentOrder = 
    {     
       order: [
          {itemId:1,
            name: "First Item",
            price: 10.99, 
           count: 2},

          {itemId:3,
            name: "Third Item",
            price: 1.99,  
            count: 4},
        ]
      }
//**************************************************** Delete whatever is contained in this ****************************************************||

let price = 0;
///Math for pricing.

currentOrder.order.forEach(item => {
  price = price+item.price*item.count
  console.log(price)}
)
  
if (shoppingCart[0] === undefined) {
  return (
    <>
    <h1>Welcome to Your Shopping Cart:</h1>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </>
  );
} else {
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
      
      {currentOrder.order.map((item) => (
      
  <tr>
  <td>{item.itemId}</td>
  <td>{item.name}</td>
  <td>{item.count}</td>
  <td>${item.count * item.price}</td>
  
  <td><Button type="submit" onClick={() => handleSubmitRemoveFromCart(item)}>Remove Item</Button> </td>
  </tr>

        

       
    ))}
  <tr>
    <th></th>
    <th></th>
    <th>Total Price:</th>
    <th>{price}</th>
    <th>  <Button variant="success" type="submit" onClick={() => handleSubmitOrder()}>Check Out</Button>
  <Button variant="danger" type="submit" onClick={() => handleDeleteOrder()}>Delete Order</Button></th>
  </tr>
    </tbody>
  </Table>


               
      </div>
    
  );
}}

export default ShoppingCart;