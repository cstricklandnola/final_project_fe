import React, { useState } from "react";
import {Redirect} from "react-router-dom"
import Button from 'react-bootstrap/Button'
const CreateListing = (props) => {
  const [listingData, setListingData] = useState("");
  const {admin} = props
  
  // if(!admin){
  //   return <Redirect to="/" />}
  
  //const { setAuthorized, loggedIn, setLoggedIn } = props;
    const loggedIn = true

  const handleSubmit = (evt) => {

    // We will be using State to hold the values for the form of sending the Create Listing.
    evt.preventDefault();
    console.log (listingData.name)
    console.log (listingData.cost)
    console.log (listingData.photos1)
    console.log (listingData.photos2)
    

    // fetch(
    //   "https://fitnesstrac-kr.herokuapp.com/api/users/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(listingData.name, password:user.password }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);

    //     if (result.message === "you're signed up!") {
    //       alert("Registered.");
    //       setAuthorized(result.token)
    //       setLoggedIn(result.token);
    //     } else {
    //       alert(result.message);
    //     }
    //   })
    //   .catch(console.error);

    // After this, we then need to get the item ID number, and then push the images one at a
  };
     return (
      <form onSubmit={handleSubmit}>
        <h1> Create Listing:</h1>
        <label>Name:</label>
        <input
          name="Name"
          required
          onChange={(e) => setListingData({ ...listingData, name: e.target.value })}
        />
        <label>Description:</label>
        <input
          name="Description"
          required
          onChange={(e) => setListingData({ ...listingData, description: e.target.value })}
        />
        <label>Cost:</label>
        <input
          name="Cost"
          required
          onChange={(e) => setListingData({ ...listingData, cost: e.target.value })}
        />
        <label>On Hand:</label>
        <input
          name="OnHand"
          required
          onChange={(e) => setListingData({ ...listingData, onHand: e.target.value })}
        />
        <label>Photos:</label>
        <input
          name="Photos"
          required
          onChange={(e) => setListingData({ ...listingData, photos1: e.target.value })}
        />
        
        <label>Featured:</label>
        <input
          name="Password"
          type= "boolean"
          required
          onChange={(e) => setListingData({ ...listingData, featured: e.target.value })}
        />
        <Button type="submit">submit</Button>
      </form>
    );
   

};

export default CreateListing;