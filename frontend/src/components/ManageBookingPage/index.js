import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';

function ManageBookingPage () {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) return <Redirect to="/" />

  useEffect(()=> {

    // TODO: dispatch booking lists
    dispatch("current user bookings");
    return () => dispatch("clear bookings");
  }, [dispatch])

  return (
    <div className='width-max-1300 mrg-l-r-auto'>
      <h1 className='txt-center'>Manage Your Bookings</h1>

    </div>
  )
}

export default ManageBookingPage;
