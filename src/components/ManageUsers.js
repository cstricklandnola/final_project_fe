import React, { useState } from "react";
import { storeToken } from "../auth";
import { Redirect } from "react-router-dom";

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


const handleSubmitAddToCart = async (user) => {
  try {
    alert("UserName: " + user.username + " was modified");
  } catch (error) {
    console.error(error);
  }
};

const handleSelectUser = async (value) => {
  try {
    const filterResults2 = dummyUserDataBase.filter(function (dummy) {
        return dummy.username === value;
      })
      console.log(filterResults2)
      
  } catch (error) {
    console.error(error);
  }
};

const handlePreviousOrders = async (user) => {
  try {
    console.log(user.previousOrders);
  } catch (error) {
    console.error(error);
  }
};

const ManageUsers = () => {
  const [manageUser, setManageUser] = useState("");


  //Filters based off Active or Not.
  const filterResults = dummyUserDataBase.filter(function (dummy) {
    return dummy.isActive === true;
  });

  const filterResults2 = dummyUserDataBase.filter(function (dummy) {
    return dummy.userId === 3;
  });

  return (
    <div>
      <h1>Welcome to The User Database:</h1>
      <form>
        <label>Select Username to view.</label>
        <select // do this for myRoutines. select an option that adds that activity from all activities and submit.
          name="Activities"
          id="select-user"
          value={manageUser} //set to id
          onChange={(event) => {
            handleSelectUser(event.target.value, setManageUser);

            return;
          }}
        >
          <option value="null">username:</option>
          {filterResults.map((user, index) => {
            return (
              <option key={index} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
      </form>

      <div className="results">
        {manageUser}
        {filterResults?.map((user, index) => {
          return (
            <div className="users" key={index}>
              <h2>
                <b>UserId:</b> {user.userId}
              </h2>
              <h4>
                <b>Username:</b> {user.username}
              </h4>
              <li>
                <b>Email:</b> {user.email}
              </li>
              <li>
                <b>IsActive:</b> {user.isActive}
              </li>
              <li>
                <b>Previous Orders:</b>{" "}
              </li>

              <form>
                <button
                  type="button"
                  onClick={() => handleSubmitAddToCart(user)}
                >
                  Modify User
                </button>
              </form>
              <button type="button" onClick={() => handlePreviousOrders(user)}>
                See Previous Orders
              </button>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUsers;
