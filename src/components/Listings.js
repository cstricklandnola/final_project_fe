import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getToken } from "../auth";
import { Redirect } from "react-router-dom";
import { CardColumns } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Listings = (props) => {
  const { orderStarted, setOrderStarted, setProducts, products, currentUser,guestCart, setGuestCart } = props;
  const userKey = document.cookie
  const token = getToken()
  // OrderedStarted is state to determine if a cart has already been made for the user.
  const [searchItem, setSearchItem] = useState("");
  // SearchItem is used to determine what the user wants to search for. This is an object that also works with the slider for Cost.

  useEffect(() => {
    axios
      .get("https://intense-lowlands-29407.herokuapp.com/api/")
      .then((response) => setProducts(response.data));
  }, []);

  const handleSubmitAddToCart = async (item) => {
    try {
      //Check state to see if an order has been started. If it hasn't been, start a new order. If it has been, add item.
      
        //orders/
        //Is logged? No. Add this to the State Array that we have for a Guest.
        
        if(userKey == 0){
          //make array!
          let tempArray = guestCart
          
          tempArray.push(item)
          setGuestCart(tempArray)
          localStorage.setItem('cart', JSON.stringify({
            guestCart
        }))
          
          
        }
          
        else {

        axios.post ("https://intense-lowlands-29407.herokuapp.com/api/orders/",
        {orderId: userKey,
        productId: item.id,
        status: "Processing",
        quantity: "1",
        
        })
        .then((response) => console.log(response))

        
        ;}
      
    } catch (error) {
      console.error(error);
    }
  };

  // This needs to have an nested filter checks for item cost, name, and artist.

  const filterResults = () => {
    //This filters our results! Name -> Cost.
    //We could use this to filter off one search bar, and have it progress down each possible data source.

    let resultsFilter = products;
    if (resultsFilter) {
      if (searchItem.name) {
        resultsFilter = resultsFilter.filter(function (dummy) {
          return dummy.name
            .toLowerCase()
            .includes(searchItem.name.toLowerCase());
        });
      }

      if (resultsFilter.length === 0) {
        console.log(resultsFilter);
        //If the filter put is the point where nothing exists by name, it will then reload the database, and then search by description.
        resultsFilter = products.filter(function (dummy) {
          return dummy.description
            .toLowerCase()
            .includes(searchItem.name.toLowerCase());
        });
      }
      if (resultsFilter.length === 0) {
        //If the filter put is the point where nothing exists by description, it will then reload the database, and then search by artist.
        resultsFilter = products.filter(function (dummy) {
          return dummy.artist
            .toLowerCase()
            .includes(searchItem.name.toLowerCase());
        });
      }
      
      if (searchItem.price) {
        resultsFilter = resultsFilter.filter(function (dummy) {
          //Magic to make $ disappear.
          var g = dummy.price
          g = g.replace(/\$/g,"")
          g = parseFloat(g)
          
          return g < parseInt(searchItem.price);
        });
      }
      return resultsFilter;
    } else {
      return false;
    }
  };
  if (products[0] === undefined) {
    return (
      <>
      <h1>Welcome to The Shop Listings:</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else {
    
    return (
      <div>
        <h1>Welcome to The Shop Listings:</h1>
        <label>Search:</label>
        <input
          type="text"
          onChange={(e) =>
            setSearchItem({ ...searchItem, name: e.target.value })
          }
        />
        <label>Cost:</label>

        <input
          type="range"
          min="100"
          max="10000"
          onChange={(e) =>
            setSearchItem({ ...searchItem, price: e.target.value })
          }
        />

        <div className="results">
          <CardColumns>
            {filterResults().map((item, index) => {
              return (
                <Card style={{ width: "18rem" }} className="mb-2">
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Text>
                      <h2>{item.name}</h2>
                      <h3>By: {item.artist}</h3>
                      <h4>{item.price}</h4>
                      <li>
                        <b>Description:</b> {item.description}
                      </li>
                      
                      <Button
                        type="button"
                        onClick={() => handleSubmitAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </div>
      </div>
    );
  }
};

export default Listings;
