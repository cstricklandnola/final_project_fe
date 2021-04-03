import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";
import Table from 'react-bootstrap/Table'

const OrdersListing = (props) => {
    const {admin} = props
    // if(!admin){
    //   return <Redirect to="/" />}

const handleStageChange = () => {
alert("Change stage?")
}
const handleCancelOrder = () => {
    alert("Cancel Order")
    }


    return ( <div><h1>Order Listing Page</h1>


<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Customer Name</th>
      <th>Username</th>
      <th>Order Status</th>
      <th>Functions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>Processing </td>
      <td><Button size="sm"
      onClick = {() => handleStageChange()}>Next Stage</Button>
      <Button size="sm"
      variant="danger"
      onClick = {() => handleCancelOrder()}>Cancel</Button></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>Complete</td>
      <td><Button size="sm"
      onClick = {() => handleStageChange()}>Next Stage</Button>
      <Button size="sm"
      variant="danger"
      onClick = {() => handleCancelOrder()}>Cancel</Button></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Joe</td>
      <td>Stewart</td>
      <td>Processing</td>
      <td><Button size="sm"
      onClick = {() => handleStageChange()}>Next Stage</Button>
      <Button size="sm"
      variant="danger"
      onClick = {() => handleCancelOrder()}>Cancel</Button></td>
    </tr>
  </tbody>
</Table>
    </div> ) 
}



export default OrdersListing;