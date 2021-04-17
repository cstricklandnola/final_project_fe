import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { getToken } from "../auth";
const token = getToken();

const OrdersListing = (props) => {
  const { admin } = props;
  const [listingData, setListingData] = useState("");
  // if(!admin){
  //   return <Redirect to="/" />}
  useEffect(() => {
    axios
      .get(
        "https://intense-lowlands-29407.herokuapp.com/api/admin/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setListingData(response.data));
  }, []);
  console.log(listingData)

  const handleStageChange = () => {
    alert("Change stage?");
  };
  const handleCancelOrder = () => {
    alert("Cancel Order");
  };
  if (listingData[0]?.id === undefined) {
    return (
      <>
        <h1>Order Listing Page:</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else {
  return (
    <div>
      <h1>Order Listing Page</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer Name</th>
            <th>Username</th>
            <th>Order Status</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
        {listingData.map((order) => (
              <tr>
                <td>{order.id}</td>
                <td>?</td>
                <td>?</td>
                <td>{order.status}</td>

                <td>
                <Button size="sm" onClick={() => handleStageChange()}>
                Next Stage
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleCancelOrder()}
              >
                Cancel
              </Button>
                </td>
              </tr>
            ))} 
        </tbody>
      </Table>
    </div>
  );
}}

export default OrdersListing;
