import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

import { getToken } from "../auth";
const token = getToken();

const ManageSelectedListing = (props) => {
  const { selectedListing, admin } = props;
  // SelectedListing is used to push the data from ManageListing to ManageSelectedListing.
  const [listingPayload, setListingPayload] = useState({});
  // ListingPayload is used to set the data needed for a Patch to the server.

  // if(!admin){
  // This is the check to prevent non admins from even seeing the page.
  //   return <Redirect to="/" />}

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
      if (!listingPayload.artist) {
        finalPayload.artist = selectedListing.artist;
      } else {
        finalPayload.artist = listingPayload.artist;
      }
      if (!listingPayload.description) {
        finalPayload.description = selectedListing.description;
      } else {
        finalPayload.description = listingPayload.description;
      }
      if (!listingPayload.price) {
        finalPayload.price = selectedListing.price;
      } else {
        finalPayload.price = listingPayload.price;
      }
      if (!listingPayload.description) {
        finalPayload.description = selectedListing.description;
      } else {
        finalPayload.description = listingPayload.description;
      }
      if (!listingPayload.stock) {
        finalPayload.stock = selectedListing.stock;
      } else {
        finalPayload.stock = listingPayload.stock;
      }
      if (!listingPayload.img) {
        finalPayload.img = selectedListing.img;
      } else {
        finalPayload.img = listingPayload.img;
      }
      if (!listingPayload.featured) {
        finalPayload.featured = selectedListing.featured;
      } else {
        finalPayload.featured = listingPayload.featured;
      }
      console.log(finalPayload);

      axios
        .patch(
          `https://intense-lowlands-29407.herokuapp.com/api/admin/${selectedListing.id}`,
          {
            name: finalPayload.name,
            artist: finalPayload.artist,
            featured: finalPayload.featured,
            price: finalPayload.price,
            description: finalPayload.description,
            isActive: finalPayload.isActive,
            img: finalPayload.img,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => console.log(response));
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
      <h3>itemId: {selectedListing.id}</h3>

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
      <label>Artist: </label>
      <input
        name="artist"
        required
        defaultValue={selectedListing.artist}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, artist: e.target.value })
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
      <label>Price: </label>
      <input
        name="price"
        required
        defaultValue={selectedListing.price}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, price: e.target.value })
        }
      />
      <p></p>
      <label>Stock: </label>
      <input
        name="stock"
        required
        defaultValue={selectedListing.stock}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, stock: e.target.value })
        }
      />
      <p></p>
      <label>Image:</label>
      <input
        name="image"
        required
        defaultValue={selectedListing.img}
        onChange={(e) =>
          setListingPayload({ ...listingPayload, img: e.target.value })
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
