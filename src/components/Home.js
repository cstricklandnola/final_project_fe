import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  const { orderStarted, setOrderStarted } = props;
  

  const handleSubmitAddToCart = async (item) => {
    try {
      //Check state to see if an order has been started. If it hasn't been, start a new order. If it has been, add item.
      if (orderStarted) {
        alert("ItemId: " + item.itemId + " was added to the cart.");
      } else {
        alert("ItemId: " + item.itemId + " was added to a NEW cart!");
        setOrderStarted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //||**************************************************** Delete whatever is contained in this ****************************************************||
  const dummyDatabase = [
    {
      itemId: 1,
      isActive: true,
      name: "First Item",
      description: "This is a description",
      cost: 10.99,
      featured: true,
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
      featured: true,
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
  //||**************************************************** Delete whatever is contained in this ****************************************************||
  const filterResults = dummyDatabase.filter(function (dummy) {
    return dummy.isActive === true && dummy.featured === true;
  });

  return (
    <div>
      <h1>Welcome to The Shop: </h1>
      <h2>Featured Listings:</h2>
      <div className="limit">
        <Carousel>
          {filterResults?.map((item, index) => {
            return (
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src={item.photos[0]}
                  alt="First slide"
                  width="300"
                  height="200"
                />
                <Carousel.Caption>
                  <h3>{item.name}</h3>
                  <p>${item.cost}</p>
                  <Button
                    type="button"
                    onClick={() => handleSubmitAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
