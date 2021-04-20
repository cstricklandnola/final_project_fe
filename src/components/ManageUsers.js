import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { getToken } from "../auth";
const token = getToken();

const handlePreviousOrders = async (user) => {
  try {
    console.log(user.previousOrders);
  } catch (error) {
    console.error(error);
  }
};

const ManageUsers = (props) => {
  const { selectedUser, setSelectedUser } = props;
  //SelectedUser is to push the User information to the ManageSelectedUser component.

  const [filteredUserList, setFilteredUserList] = useState("");
  //FilterUserList is used to filter the results via searching.

  const [userData, setUserData] = useState("");

  const { admin } = props;

  // if(!admin){
  // This is the check to prevent non admins from even seeing the page.
  //   return <Redirect to="/" />}

  useEffect(() => {
    axios
      .get(
        "https://intense-lowlands-29407.herokuapp.com/api/customers/manage_customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setUserData(response.data));
  }, []);

  const filterResults = () => {
    //This filters our results! Name -> Cost.
    let resultsFilter = userData;
  
    if (filteredUserList.username) {
      resultsFilter = resultsFilter.filter(function (dummy) {
        return dummy.username
          .toLowerCase()
          .includes(filteredUserList.username.toLowerCase());
      });
    }

    if (filteredUserList.email) {
      resultsFilter = resultsFilter.filter(function (dummy) {
        return dummy.email.includes(filteredUserList.email.toLowerCase());
      });
    }
    return resultsFilter;
  };
  if (userData[0]?.username === undefined) {
    return (
      <>
        <h1>Welcome to The User Database:</h1>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </>
    );
  } else {
    return (
      <div>
        <h1>Welcome to The User Database:</h1>
        <label>Username Search:</label>
        <input
          type="text"
          onChange={(e) =>
            setFilteredUserList({
              ...filteredUserList,
              username: e.target.value,
            })
          }
        />
        <label>E-Mail Search:</label>
        <input
          type="text"
          onChange={(e) =>
            setFilteredUserList({ ...filteredUserList, email: e.target.value })
          }
        />

        <div className="results">
          <div className="users">
            <CardColumns>
              {filterResults()?.map((user, index) => {
                return (
                  <Card style={{ width: "18rem" }} className="mb-2">
                    <Card.Body>
                      <Card.Text>
                        <li>
                          <b>UserId:</b> {user.id}
                        </li>
                        <li>
                          <b>Username:</b> {user.username}
                        </li>
                        <li>
                          <b>Email:</b> {user.email}
                        </li>
                        <li>
                          <b>IsActive:</b> {user.isActive}
                        </li>
                        <li>
                          <b>Previous Orders:</b>
                          {user.uniqueOrderId}
                        </li>

                        <Link to="/ManageSelectedUser">
                          <Button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                          >
                            Modify User
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => handlePreviousOrders(user)}
                        >
                          See Previous Orders
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageUsers;
