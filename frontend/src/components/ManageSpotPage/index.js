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

  useEffect(()=> {
    dispatch(thunkCurrentUserSpot());
    return () => dispatch(clearAllSpot());
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />

  return (
    <div className='width-max-1300 mrg-l-r-auto'>
      <h1 className='txt-center'>Manage Your Spots</h1>
      {!userSpot.length && <Link to="/spots/new">
          <button className='bg-white pad5 bor-rad-5 width250p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600'>
            Create a New Spot
          </button>
        </Link>}
      <div className='spotContainer'>
        {userSpot.map(element =>
          <div key={element.id}>
            <SpotCard spot={element} />
            <div className="mrg15">
              <Link to={`/spots/${element.id}/edit`}>
                <button className='bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600 mrg-r-5'>
                  Update
                </button>
              </Link>
              <OpenModalButton
                buttonText="Delete"
                buttonStyle="bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600"
                modalComponent={<DeleteSpotModal spotId={element.id}/>}
              />
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default ManageSpotPage;
