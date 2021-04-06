import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";

import Button from "react-bootstrap/Button";

//||****************************************************||Delete whatever is contained in this ****************************************************||

//**************************************************** Delete whatever is contained in this ****************************************************||

const ManageSelectedUser = (props) => {
  const { selectedUser, admin } = props;
  

  const [userPayload, setUserPayload] = useState({});
 // UserPayload is used to set the data needed for a Patch to the server.

  // if(!admin){
  // This is the check to prevent non admins from even seeing the page.
  //   return <Redirect to="/" />}

  const handleCommitChanges = async () => {
    try {
      //This creates the final Payload to send to the Patch for the Username.
      let finalPayload = {}

      //If the payload is missing the data from the Selected Listing, it will add it into the payload.
      if (!userPayload.name) {
        
        finalPayload.name = selectedUser.name ;
      }
      else{finalPayload.name = userPayload.name}
      if (!userPayload.username) {
        finalPayload.username = selectedUser.username ;
      }
      else{finalPayload.username = userPayload.username}
      if (!userPayload.isAdmin) {
        finalPayload.isAdmin = selectedUser.isAdmin
      }else{finalPayload.isAdmin = userPayload.isAdmin}
      if (!userPayload.email) {
        finalPayload.email = selectedUser.email
      }else{finalPayload.email = userPayload.email}
      console.log(finalPayload);
    } catch (error) {
      console.error(error);
      
    }
  };

  const handlePasswordReset = async () => {
    try {
      //This assumes we can randomize a new password.
      alert(selectedUser.userId + "has been sent a new password.")
    } catch (error) {
      console.error(error);
      
    }}
  
  //   if(!admin){
  //     return <Redirect to="/" />}

  // This needs to be changed to where the state loads into text boxes so that they can be editted.

  return (
    <div>
      <h1>Welcome to The Modify User Page:</h1>
      {selectedUser.username}
      <li>userId: {selectedUser.userId}</li>
      <li>isActive: {selectedUser.isActive}</li>
      <li>name: {selectedUser.name}</li>
      <label>Name:</label>
      <input
        name="name"
        required
        defaultValue={selectedUser.name}
        onChange={(e) =>
          setUserPayload({ ...userPayload, name: e.target.value })
        }
      />
      <p></p>
      <label>Username:</label>
      <input
        name="username"
        required
        defaultValue={selectedUser.username}
        onChange={(e) =>
          setUserPayload({ ...userPayload, username: e.target.value })
        }
      />
      <p></p>
      <label>Email:</label>
      <input
        name="email"
        required
        defaultValue={selectedUser.email}
        onChange={(e) =>
          setUserPayload({ ...userPayload, email: e.target.value })
        }
      />
      <p></p>
      <label>Admin:</label>
      <input
        name="isAdmin"
        required
        defaultValue={selectedUser.isAdmin}
        onChange={(e) =>
          setUserPayload({ ...userPayload, isAdmin: e.target.value })
        }
      />
      <p></p>
      
      <Button
        type="button"
        variant="secondary"
        onClick={() => handleCommitChanges(userPayload)}
      >
        Commit Changes
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => handlePasswordReset()}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ManageSelectedUser;
