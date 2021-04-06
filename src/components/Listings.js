import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import { CardColumns } from "react-bootstrap";

const Listings = (props) => {
  const { orderStarted, setOrderStarted } = props;
  // OrderedStarted is state to determine if a cart has already been made for the user.
  const [searchItem, setSearchItem] = useState("");
  // SearchItem is used to determine what the user wants to search for. This is an object that also works with the slider for Cost.

  console.log(orderStarted);

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
      artist: "Steve",
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
      artist: "Steve",
      description: "This is a second description, banana",
      cost: 4.99,
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
      artist: "Bill",
      description: "This is a third description",
      cost: 2.99,
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
      artist: "Joe",
      description: "This is a fourth description",
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
      artist: "Joe",
      description: "This is a fifth description",
      cost: 100.99,
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
    },
  ];
  //||****************************************************Delete whatever is contained in this ****************************************************||
  //Filters based off Active or Not.

  // This needs to have an nested filter checks for item cost, name, and artist.

  let filterResults2 = dummyDatabase.filter(function (dummy) {
    return dummy.cost < searchItem.cost;
  });

  const filterResults = () => {
    //This filters our results! Name -> Cost.
    //We could use this to filter off one search bar, and have it progress down each possible data source.
    let resultsFilter = dummyDatabase;

    if (searchItem.name) {
      resultsFilter = resultsFilter.filter(function (dummy) {
        return dummy.name.toLowerCase().includes(searchItem.name.toLowerCase());
      });
    }
    console.log(resultsFilter);
    if (resultsFilter.length === 0) {
      console.log(resultsFilter);
      //If the filter put is the point where nothing exists by name, it will then reload the database, and then search by description.
      resultsFilter = dummyDatabase.filter(function (dummy) {
        return dummy.description
          .toLowerCase()
          .includes(searchItem.name.toLowerCase());
      });
    }
    if (resultsFilter.length === 0) {
      console.log(resultsFilter);
      //If the filter put is the point where nothing exists by description, it will then reload the database, and then search by artist.
      resultsFilter = dummyDatabase.filter(function (dummy) {
        return dummy.artist
          .toLowerCase()
          .includes(searchItem.name.toLowerCase());
      });
    }

    if (searchItem.cost) {
      resultsFilter = resultsFilter.filter(function (dummy) {
        return dummy.cost < searchItem.cost;
      });
    }
    return resultsFilter;
  };

  return (
    <div>
      <h1>Welcome to The Shop Listings:</h1>
      <label>Search:</label>
      <input
        type="text"
        onChange={(e) => setSearchItem({ ...searchItem, name: e.target.value })}
      />
      <label>Cost:</label>

      <input
        type="range"
        min="1"
        max="1000"
        onChange={(e) => setSearchItem({ ...searchItem, cost: e.target.value })}
      />

      <div className="results">
        <CardColumns>
          {filterResults()?.map((item, index) => {
            return (
              <Card style={{ width: "18rem" }} className="mb-2">
                <Card.Img variant="top" src={item.photos[0]} />
                <Card.Body>
                  <Card.Text>
                    <h2>{item.name}</h2>
                    <h3>By: {item.artist}</h3>
                    <h4>${item.cost}</h4>
                    <li>
                      <b>Description:</b> {item.description}
                    </li>
                    <li>
                      <b>Reviews:</b> {item.reviews}
                    </li>
                    <form>
                      <Button
                        type="button"
                        onClick={() => handleSubmitAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </form>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </div>
  );
};

export default Listings;
