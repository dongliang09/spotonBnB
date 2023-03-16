import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from '../LandingPage/spotCard';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from './DeleteSpotModal';
import { clearAllSpot, thunkCurrentUserSpot } from '../../store/spot';

function ManageSpotPage () {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userSpotObj = useSelector(state=>state.spots.allSpots);
  const userSpot = Object.values(userSpotObj);
  // console.log("userSpot", userSpot)

  useEffect(()=> {
    dispatch(thunkCurrentUserSpot());
    return () => dispatch(clearAllSpot());
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />

  return (
    <div>
      <h1>Manage Your Spots</h1>
      {!userSpot.length && <button><Link to="/spots/new">Create a New Spot</Link></button>}
      <div className='spotContainer'>
        {userSpot.map(element =>
          <div key={element.id}>
            <SpotCard spot={element} />
            <div>
              <button><Link to={`/spots/${element.id}/edit`}>Update</Link></button>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spotId={element.id}/>}
              />
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default ManageSpotPage;
