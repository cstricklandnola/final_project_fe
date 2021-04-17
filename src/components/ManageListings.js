import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { getToken } from "../auth";
const token = getToken();

const HandleSubmitDeleteItem = async (item) => {
  try {
    //This creates the final Payload to send to the Patch for Item.
    
    //If the payload is missing the data from the Selected Listing, it will add it into the payload.
    axios
      .patch(
        `https://intense-lowlands-29407.herokuapp.com/api/admin/${item.id}`,
        {
          
          isActive: false,
         
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      
  
    } catch (error) {
      console.error(error);
    }}
  
const ManageListings = (props) => {
  const {
    admin,
    setSelectedListing,
    products,
    setProducts,
  } = props;
  // SelectedListing is used to push the data from ManageListing to ManageSelectedListing.
  const [searchItem, setSearchItem] = useState("");
  // if(!admin){
  // This is the check to prevent non admins from even seeing the page.
  //   return <Redirect to="/" />}

  useEffect(() => {
    axios
      .get("https://intense-lowlands-29407.herokuapp.com/api/")
      .then((response) => setProducts(response.data));
  }, []);

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
      return resultsFilter;
    } else {
      return false;
    }
  };
  if (products[0] === undefined) {
    return (
      <>
        <h1>Manage Listings:</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else {
    return (
      <div>
        <h1>Manage Listings:</h1>
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

                      <Link to="/ManageSelectedListing">
                        <Button
                          type="button"
                          onClick={() => setSelectedListing(item)}
                        >
                          Modify Listing
                        </Button>
                      </Link>

                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => HandleSubmitDeleteItem(item)}
                      >
                        Delete
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

export default ManageListings;
