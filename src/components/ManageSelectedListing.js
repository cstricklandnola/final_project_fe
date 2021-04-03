import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";

//||****************************************************||Delete whatever is contained in this ****************************************************||
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
  },
];
//**************************************************** Delete whatever is contained in this ****************************************************||

const ManageSelectedListing = (props) => {
  const { selectedListing, admin } = props;
  const [listingPayload, setListingPayload] = useState({});

  const handleCommitChanges = async () => {
    try {
      //This creates the final Payload to send to the Patch for Item.
      let finalPayload = {};

      //If the payload is missing the data from the Selected Listing, it will add it into the payload.
      if (!listingPayload.isActive) {
        finalPayload.isActive = selectedListing.isActive;
      } else {
        finalPayload.isActive = listingPayload.isActive;
      }
      if (!listingPayload.name) {
        finalPayload.name = selectedListing.name;
      } else {
        finalPayload.name = listingPayload.name;
      }
      if (!listingPayload.description) {
        finalPayload.description = selectedListing.description;
      } else {
        finalPayload.description = listingPayload.description;
      }
      if (!listingPayload.cost) {
        finalPayload.cost = selectedListing.cost;
      } else {
        finalPayload.cost = listingPayload.cost;
      }
      if (!listingPayload.description) {
        finalPayload.description = selectedListing.description;
      } else {
        finalPayload.description = listingPayload.description;
      }
      if (!listingPayload.onHand) {
        finalPayload.onHand = selectedListing.onHand;
      } else {
        finalPayload.onHand = listingPayload.onHand;
      }
      if (!listingPayload.photos) {
        finalPayload.photos = selectedListing.photos;
      } else {
        finalPayload.photos = listingPayload.photos;
      }
      if (!listingPayload.featured) {
        finalPayload.featured = selectedListing.featured;
      } else {
        finalPayload.featured = listingPayload.featured;
      }
      console.log(finalPayload);
    } catch (error) {
      console.error(error);
    }
  };
  //   if(!admin){
  //     return <Redirect to="/" />}

  // This needs to be changed to where the state loads into text boxes so that they can be editted.

  return (
    <div>
      <h1>Welcome to The Modify Listing Page:</h1>
      <h2>{selectedListing.name}</h2>
      <h3>itemId: {selectedListing.itemId}</h3>

      <label>isActive: </label>
      <input
        name="name"
        required
        defaultValue={selectedListing.isActive}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, isActive: e.target.value })
        }
      />
      <p></p>
      <label>Name: </label>
      <input
        name="name"
        required
        defaultValue={selectedListing.name}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, name: e.target.value })
        }
      />
      <p></p>
      <label>Description: </label>
      <input
        name="description"
        required
        defaultValue={selectedListing.description}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, description: e.target.value })
        }
      />
      <p></p>
      <label>Cost: </label>
      <input
        name="cost"
        required
        defaultValue={selectedListing.cost}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, cost: e.target.value })
        }
      />
      <p></p>
      <label>On Hand: </label>
      <input
        name="onHand"
        required
        defaultValue={selectedListing.onHand}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, onHand: e.target.value })
        }
      />
      <p></p>
      <label>Photos:</label>
      <input
        name="photos"
        required
        defaultValue={selectedListing.photos}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, photos: e.target.value })
        }
      />
      <p></p>
      <label>Featured:</label>
      <input
        name="featured"
        required
        defaultValue={selectedListing.featured}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, featured: e.target.value })
        }
      />
      <p></p>

      <Button
        type="button"
        variant="secondary"
        onClick={() => handleCommitChanges()}
      >
        Commit Changes
      </Button>
    </div>
  );
};

export default ManageSelectedListing;
