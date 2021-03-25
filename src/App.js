import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {getToken, clearToken} from "./auth"
import{fetchUserData, fetchAllActivites} from "./api"
import {
  Login,
  Register,
  Home,
  Listings,
  CreateListing,
  ManageUsers
} from "./components"

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  
  //Temp variable settings
  
  const  test_currentUser = "Joe Fake"
  const  test_authorized = "FakeAuthorization"


  //The above needs to be deleted.

  
  // useEffect(async () => {
  //   if (loggedIn) {
  //       try {
  //           const data = await fetchUserData();
  //           setCurrentUser(data.username);
  //           const grabbedActivities = await fetchAllActivites();
  //           setActivities(grabbedActivities);

  //       } catch (error) {
  //           console.error(error);
  //       }
  //   }
  // }, [loggedIn])

  return (
    <Router>
      <nav className="navBar">
        <h1>Spend Money!</h1>
        <div>
          <Link className="Link" to= '/ManageUsers'>Manage Users</Link>
          <Link className="Link" to= '/CreateListing'>Create Listings</Link>
          <Link className="Link" to= '/Listings'>Listings</Link>
          {/* !authorized  */ !loggedIn ? (<Link className="Link" to= '/Login'>Login</Link>) : null}
          {/* !authorized  */ !loggedIn ? (<Link className="Link" to= '/Register'>Sign Up</Link>) : null}
          {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        
                        setLoggedIn(null);
                        setAuthorized(null)
                        setCurrentUser(null)
                    }}
                        to='/'>Log Out</Link> : null}
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path= '/'>
            <Home />
          </Route>
          <Route path='/ManageUsers'>
              <ManageUsers
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                setAuthorized={setAuthorized}
                authorized={authorized}
              />
          </Route>
          <Route path='/Login'>
              <Login
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                setAuthorized={setAuthorized}
                authorized={authorized}
              />
          </Route>
          <Route path='/Register'>
             <Register
             setAuthorized={setAuthorized} 
             loggedIn={loggedIn}
             setLoggedIn={setLoggedIn}
             /> 
          </Route>
          <Route path='/Listings'>
             <Listings
             setAuthorized={setAuthorized} 
             loggedIn={loggedIn}
             setLoggedIn={setLoggedIn}
             /> 
          </Route>
          <Route path='/CreateListing'>
             <CreateListing
             setAuthorized={setAuthorized} 
             loggedIn={loggedIn}
             setLoggedIn={setLoggedIn}
             /> 
          </Route>
         
        </Switch>  
      </main>
    </Router>
  );
}

export default App;
