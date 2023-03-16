import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../LandingPage/spotCard';
import { thunkCurrentUserSpot } from '../../store/spot';

function ManageSpotPage () {
  const dispatch = useDispatch();
  const userSpotObj = useSelector(state=>state.spots.userSpot);
  const userSpot = Object.values(userSpotObj);
  console.log("userSpot", userSpot)

  useEffect(()=> {
    dispatch(thunkCurrentUserSpot());
  }, [dispatch])
  return (
    <div>
      <h1>Manage Your Spots</h1>
      <button><Link to="/spots/new">Create a New Spot</Link></button>
      <div className='spotContainer'>
        {userSpot.map(element=> <SpotCard spot={element} />)}
      </div>
    </div>
  )
}

export default ManageSpotPage;
