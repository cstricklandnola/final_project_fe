import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { getToken } from "../auth";
const token = getToken();

const CreateListing = (props) => {
  const [listingData, setListingData] = useState("");
  // This is the state for creating a listing. This uses state in case we want to create a 'preview page' as extra credit, rather than just a normal object.

  const { admin } = props;

  // if(!admin){
  // This is the check to prevent non admins from even seeing the page.
  //   return <Redirect to="/" />}

  //const { setAuthorized, loggedIn, setLoggedIn } = props;

  const handleSubmit = (evt) => {
    // We will be using State to hold the values for the form of sending the Create Listing.

    evt.preventDefault();
    console.log(listingData);
    try {
      //Creates a new listing.

      axios
        .post(
          "https://intense-lowlands-29407.herokuapp.com/api/products/",
          {
            isActive: listingData.isActive,
            name: listingData.name,
            artist: listingData.artist,
            description: listingData.description,
            img: listingData.img,
            price: listingData.price,
            featured: listingData.featured,
            stock: listingData.stock,
            keywords: listingData.keywords,
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
  return (
    <form onSubmit={handleSubmit}>
      <h1> Create Listing:</h1>
      <label>Name:</label>
      <input
        name="Name"
        required
        onChange={(e) =>
          setListingData({ ...listingData, name: e.target.value })
        }
      />
      <p></p>
      <label>Artist:</label>
      <input
        name="artist"
        required
        onChange={(e) =>
          setListingData({ ...listingData, artist: e.target.value })
        }
      />
      <p></p>
      <label>Description:</label>
      <input
        name="Description"
        required
        onChange={(e) =>
          setListingData({ ...listingData, description: e.target.value })
        }
      />
      <p></p>
      <label>Price:</label>
      <input
        name="price"
        required
        onChange={(e) =>
          setListingData({ ...listingData, price: e.target.value })
        }
      />
      <p></p>
      <label>Stock:</label>
      <input
        name="Stock"
        required
        onChange={(e) =>
          setListingData({ ...listingData, stock: e.target.value })
        }
      />
      <p></p>
      <label>Image:</label>
      <input
        name="image"
        required
        onChange={(e) =>
          setListingData({ ...listingData, img: e.target.value })
        }
      />
      <p></p>
      <label>Active:</label>
      <input
        name="isActive"
        type="boolean"
        required
        onChange={(e) =>
          setListingData({ ...listingData, isActive: e.target.value })
        }
      />
      <p></p>

      <label>Featured:</label>
      <input
        name="featured"
        type="boolean"
        required
        onChange={(e) =>
          setListingData({ ...listingData, featured: e.target.value })
        }
      />
      <p></p>
      <label>keywords:</label>
      <input
        name="keywords"
        required
        onChange={(e) =>
          setListingData({ ...listingData, keywords: e.target.value })
        }
      />
      <p></p>

      <Button type="submit">submit</Button>
    </form>
  );
};

export default CreateListing;
