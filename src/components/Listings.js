import React, { useState } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"

const handleSubmitAddToCart = async (item) => {
  try {
    alert("ItemId: "+ item.itemId + " was added to the cart.");
  } catch (error) {
    console.error(error);
  }
};

const Listings = () => {
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
  ];
  //Filters based off Active or Not.
  const filterResults = dummyDatabase.filter(function (dummy) {
    return dummy.isActive === true;})

    console.log (filterResults)

  return (
    <div>
      <h1>Welcome to The Shop Listings:</h1>
      <div className="results">
        {filterResults?.map((item, index) => {
          return (
            
            <div className="listing" key={index}>
              <img src={item.photos[0]} alt={item.name}></img>  
              <h2><b>Product:</b> {item.name}</h2>
              <h4><b>Price:</b> ${item.cost}</h4>
              <li><b>Description:</b> {item.description}</li>
              <li><b>Reviews:</b> {item.reviews}</li>
              <form>
                <button
                  type="button"
                  onClick={() => handleSubmitAddToCart(item)}
                >
                  Add to Cart
                </button>
              </form>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
