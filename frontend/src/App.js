import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal";
// import SignupFormPage from "./components/SignupFormModal";
import LandingPage from "./components/LandingPage";
import SingleSpot from './components/SingleSpot';
import CreateSpotPage from './components/CreateSpotPage';
import ManageSpotPage from './components/ManageSpotPage';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotPage />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpotPage />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
