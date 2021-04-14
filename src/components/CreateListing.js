import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
      <label>Description:</label>
      <input
        name="Description"
        required
        onChange={(e) =>
          setListingData({ ...listingData, description: e.target.value })
        }
      />
      <p></p>
      <label>Cost:</label>
      <input
        name="Cost"
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

      <label>Featured:</label>
      <input
        name="Password"
        type="boolean"
        required
        onChange={(e) =>
          setListingData({ ...listingData, featured: e.target.value })
        }
      />
      <p></p>
      <Button type="submit">submit</Button>
    </form>
  );
};

export default CreateListing;
