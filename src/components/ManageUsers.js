import React, { useState, useEffect } from "react";
import { getToken } from "../auth";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

//||**************************************************** Delete whatever is contained in this ****************************************************||
const dummyUserDataBase = [
  {
    userId: 1,
    isActive: true,
    isAdmin: true,
    username: "JohnSmith99",
    name: "John Smith",
    email: "a@a.com",
    password: "123123",
    previousOrders: [],
    currentOrder: {
      uniqueOrderId: "1",
      items: [
        [1, 5],
        [2, 4],
        [3, 3],
        [4, 2],
        [5, 1],
      ],
    },
    reviews: [
      {
        itemId: "1",
        reviewId: 1,
        date: "10/17/2020",
        rating: "5",
        text: "This was great!",
      },
      {
        itemId: "2",
        reviewId: 2,
        date: "10/20/2020",
        rating: "2",
        text: "This was terrible.",
      },
    ],
  },
  {
    userId: 2,
    isActive: true,
    isAdmin: false,
    username: "AnnaJoe",
    name: "Anna Joe",
    email: "b@b.com",
    password: "22222222",
    previousOrders: [],
    currentOrder: {
      uniqueOrderId: "2",
      items: [
        [2, 1],
        [3, 2],
        [4, 1],
        [5, 22],
        [1, 55],
      ],
    },
    reviews: [
      {
        itemId: "3",
        reviewId: 4,
        date: "11/11/2020",
        rating: "3",
        text: "This was meh!",
      },
      {
        itemId: "4",
        reviewId: 3,
        date: "12/01/2020",
        rating: "2",
        text: "This was okay.",
      },
    ],
  },
  {
    userId: 3,
    isActive: true,
    isAdmin: false,
    username: "BillyBob11",
    name: "Billy Bob",
    email: "c@c.com",
    password: "3333333",
    previousOrders: [
      {
        uniqueOrderId: 3,
        items: [
          [2, 1],
          [1, 3],
        ],
      },
    ],
    currentOrder: {
      uniqueOrderId: "4",
      items: [
        [1, 2],
        [4, 3],
      ],
    },
    reviews: [
      {
        itemId: "3",
        reviewId: 4,
        date: "11/11/2020",
        rating: "3",
        text: "This was meh!",
      },
      {
        itemId: "4",
        reviewId: 3,
        date: "12/01/2020",
        rating: "2",
        text: "This was okay.",
      },
    ],
  },
];
// **************************************************** Delete whatever is contained in this ****************************************************||

// const handleSelectUser = async (value, setSelectedUser, selectedUser) => {
//   try {
//     const filterResults2 = dummyUserDataBase.filter(function (dummy) {
//       return dummy.username === value;
//     });
//     setSelectedUser(...filterResults2);
//     console.log(selectedUser);
//   } catch (error) {
//     console.error(error);
//   }
// };

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
      .then((response) => console.log(response));
  }, []);

  const filterResults = () => {
    //This filters our results! Name -> Cost.
    let resultsFilter = dummyUserDataBase;
    console.log(filteredUserList.username);
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

  return (
    <div>
      <h1>Welcome to The User Database:</h1>
      <label>Username Search:</label>
      <input
        type="text"
        onChange={(e) =>
          setFilteredUserList({ ...filteredUserList, username: e.target.value })
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
                        <b>UserId:</b> {user.userId}
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
};

export default ManageUsers;
