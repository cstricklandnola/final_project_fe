import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Link} from "react-router-dom"
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


const dummyUserDataBase = [
  {
    userId: 1,
    isActive: true,
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

const handlePreviousOrders = async (user) => {
  try {
    console.log(user.previousOrders);
  } catch (error) {
    console.error(error);
  }
};





const ManageUsers = (props) => {
  const {selectedUser, setSelectedUser} = props
  const [filteredUser, setFilteredUser] = useState("");
  
  const {admin} = props
  
  // if(!admin){
  //   return <Redirect to="/" />}

  //Filters based off Active or Not.
  const filterResults2 = dummyUserDataBase.filter(function (dummy) {
    return dummy.isActive === true;
  });

  const handleModifyUser = async (user) => {
    try {
      alert("UserName: " + user.username + " was modified");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to The User Database:</h1>
    
      <div className="results">
        {filteredUser.username}

        <div className="users">
          <CardColumns>
            {filterResults2?.map((user, index) => {
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
                        <b>Previous Orders:</b>{user.uniqueOrderId}
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
