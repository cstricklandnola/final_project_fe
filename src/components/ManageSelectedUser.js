import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { getToken } from "../auth";
const token = getToken();

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
      let finalPayload = {};

      //If the payload is missing the data from the Selected Listing, it will add it into the payload.
      if (!userPayload.firstName) {
        finalPayload.firstName = selectedUser.firstName;
      } else {
        finalPayload.firstName = userPayload.firstName;
      }
      if (!userPayload.lastName) {
        finalPayload.lastName = selectedUser.lastName;
      } else {
        finalPayload.lastName = userPayload.lastName;
      }
      if (!userPayload.username) {
        finalPayload.username = selectedUser.username;
      } else {
        finalPayload.username = userPayload.username;
      }
      if (!userPayload.isAdmin) {
        finalPayload.isAdmin = selectedUser.isAdmin;
      } else {
        finalPayload.isAdmin = userPayload.isAdmin;
      }
      if (!userPayload.email) {
        finalPayload.email = selectedUser.email;
      } else {
        finalPayload.email = userPayload.email;
      }
      console.log(finalPayload);

      axios
        .patch(
          `https://intense-lowlands-29407.herokuapp.com/api/admin/manage_customer/${selectedUser.id}`,
          {
            firstName: finalPayload.firstName,
            lastName: finalPayload.lastName,
            username: finalPayload.username,
            isAdmin: finalPayload.isAdmin,
            isActive: finalPayload.isActive,
            email: finalPayload.email,
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

  const handlePasswordReset = async () => {
    try {
      //This assumes we can randomize a new password.
      alert(selectedUser.userId + "has been sent a new password.");
    } catch (error) {
      console.error(error);
    }
  };

  //   if(!admin){
  //     return <Redirect to="/" />}

  // This needs to be changed to where the state loads into text boxes so that they can be editted.

  return (
    <div>
      <h1>Welcome to The Modify User Page:</h1>
      {selectedUser.username}
      <li>userId: {selectedUser.id}</li>
      <li>isActive: {selectedUser.isActive}</li>
      <label>First Name:</label>
      <input
        name="firstName"
        required
        defaultValue={selectedUser.firstName}
        onChange={(e) =>
          setUserPayload({ ...userPayload, firstName: e.target.value })
        }
      />
      <p></p>
      <label>Last Name:</label>
      <input
        name="lastName"
        required
        defaultValue={selectedUser.lastName}
        onChange={(e) =>
          setUserPayload({ ...userPayload, lastName: e.target.value })
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
