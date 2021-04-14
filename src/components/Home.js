import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  const { orderStarted, setOrderStarted, products } = props;
  
  console.log(products)

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
  
  //||**************************************************** Delete whatever is contained in this ****************************************************||
  const filterResults = products.filter(function (dummy) {
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
                  src={item.img}
                  alt="First slide"
                  width="300"
                  height="200"
                />
                <Carousel.Caption>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
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
