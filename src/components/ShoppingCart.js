import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import { CardColumns } from "react-bootstrap";

const handleSubmitRemoveFromCart = async (item) => {
  try {
    alert("ItemId: "+ item.itemId + " was removed from the cart.");
  } catch (error) {
    console.error(error);
  }
};

const ShoppingCart = () => {

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
          count: 2},

          {itemId:3, 
            count: 4},
        ]
      }
//**************************************************** Delete whatever is contained in this ****************************************************||
  
  
  //Filters based off Active or Not.
  const filterResults = dummyDatabase.filter(function (dummy) {
    return dummy.isActive === true;})

  



 
    

  return (
    <div>
      <h1>Welcome to Your Shopping Cart:</h1>
      <div className="results">
      {currentOrder.order.map((item) => (
        <li>Item: {item.itemId} Count: {item.count}</li>

       
    ))}
     
               
      </div>
    </div>
  );
};

export default ShoppingCart;