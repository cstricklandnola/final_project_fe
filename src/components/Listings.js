import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { CardColumns } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "./listings.css";
import {v4} from 'uuid';
import { NotificationContext } from "../Notifications/NotificationsProvider";

const Listings = (props) => {
  const { setProducts, products, guestCart, setGuestCart } = props;
  const userKey = document.cookie;

  const dispatch = useContext(NotificationContext);

  const handleNewNotification = (prop) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        type: "SUCCESS",
        message: `"${prop.name}" now added to cart!`,
      },
    });
  }

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

      if (userKey == 0) {
        //make array!
        let tempArray = guestCart;

        tempArray.push(item);
        setGuestCart(tempArray);
        localStorage.setItem(
          "cart",
          JSON.stringify({
            guestCart,
          })
        );
      } else {
        axios.post("https://intense-lowlands-29407.herokuapp.com/api/orders/", {
          orderId: userKey,
          productId: item.id,
          status: "Processing",
          quantity: "1",
        });
      }
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
          var g = dummy.price;
          g = g.replace(/\$/g, "");
          g = parseFloat(g);

          return g < parseInt(searchItem.price);
        });
      }
      return resultsFilter.filter(function (dummy) {
        return dummy.isActive;
      });
    } else {
      return false;
    }
  };
  if (products[0] === undefined) {
    return (
      <div class="listings">
        <h1>THE CRESCENT CITY ART COLLECTION</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <div class="listings">
        <h1>THE CRESCENT CITY ART COLLECTION</h1>
        <input
          type="text"
          style={{ width: "50%" }}
          placeholder="Search by name, artist, etc..."
          onChange={(e) =>
            setSearchItem({ ...searchItem, name: e.target.value })
          }
        />
        <label style={{ color: "#fff", fontSize: "25px", marginTop: "30px" }}>
          Filter by Cost:
        </label>

        <input
          id="cost-filter"
          type="range"
          min="250"
          max="50000"
          onChange={(e) =>
            setSearchItem({ ...searchItem, price: e.target.value })
          }
        />

        <div className="results">
          <CardColumns>
            {filterResults().map((item, index) => {
              return (
                <Card
                  style={{ width: "25rem", height: "auto" }}
                  className="mb-2"
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "auto", width: "25rem" }}
                    src={item.img}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Text>
                      <h2>{item.name}</h2>
                      <h3>By: {item.artist}</h3>
                      <h4>{item.price}</h4>
                      <b>Description:</b> {item.description}
                      <p></p>
                      <Button
                        type="button"
                        onClick={() => {
                          handleNewNotification(item);
                          handleSubmitAddToCart(item); 
                          }
                        }
                        
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
