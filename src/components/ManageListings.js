import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import { CardColumns } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom"




const HandleSubmitDeleteItem = async (item) => {
    try {
      alert("ItemId: "+ item.itemId + " is going to be deleted.");
    } catch (error) {
      console.error(error);
    }
  };

const ManageListings = (props) => {
    const {admin} = props
    const {selectedListing, setSelectedListing} = props
    const [searchItem, setSearchItem] = useState("")
    // console.log (admin)
    // if(!admin){
    //   return <Redirect to="/" />}
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
        }
      ];
      //**************************************************** Delete whatever is contained in this ****************************************************||
      //Filters based off Active or Not.
      

        const filterResults = () => {
          //This filters our results! Name -> Cost.
          //We could use this to filter off one search bar, and have it progress down each possible data source.
          let resultsFilter = dummyDatabase
          console.log (searchItem.name)
          if (searchItem.name){
            resultsFilter = resultsFilter.filter(function (dummy) {
              return dummy.name.toLowerCase().includes( searchItem.name.toLowerCase());})
              }
              
          if (searchItem.cost){
            resultsFilter = resultsFilter.filter(function (dummy) {
            return dummy.cost < searchItem.cost;})
            }
          return resultsFilter}
    
      
    return (
        <div>
          <h1>Edit Listings:</h1>
          <label>Search:</label>
      <input
          type="text"
          
          onChange={(e) => setSearchItem({...searchItem, name: e.target.value})}
        />
          
          <div className="results">
          <CardColumns>
            {filterResults()?.map((item, index) => {
              return (
                
                <Card
                style={{ width: '18rem' }}
                className="mb-2">
                <Card.Img variant="top" src={item.photos[0]} />
                <Card.Body>
                  <Card.Text>
                  <h2>{item.name}</h2>
                  <h4>${item.cost}</h4>
                  <li><b>Description:</b> {item.description}</li>
                  <li><b>Reviews:</b> {item.reviews}</li>
                  
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


  

export default ManageListings;
