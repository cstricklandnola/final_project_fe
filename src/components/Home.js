import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const handleSubmitAddToCart = async (item) => {
    try {
      alert("ItemId: "+ item.itemId + " was added to the cart.");
    } catch (error) {
      console.error(error);
    }
  };

const Home = () => {
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
    const filterResults = dummyDatabase.filter(function (dummy) {
        return dummy.isActive === true && dummy.featured === true;})

    return(
    <div>
      <h1>Welcome to The Shop: </h1>
         <h2>Featured Listings:</h2>
         <div className= "limit">
         <Carousel>
        {filterResults?.map((item, index) => {
          return (
            <Carousel.Item interval={1000}>
              <img
              className="d-block w-100"
              src={item.photos[0]}
              alt="First slide"
              width="300" height="200"
              
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

      
    </div>)


}





export default Home

