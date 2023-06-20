import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearAllBookings, thunkUserBookings } from '../../store/booking';
import BookingCard from './BookingCard';

function ManageBookingPage () {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userBookingObj = useSelector(state=>state.bookings.userBooking);
  const userBookings = Object.values(userBookingObj);

  const currentTime = (new Date()).getTime()

  // pastBookings : current time > endate
  const pastBookings = userBookings.filter(booking => {
    let bookingEndDate =  new Date(booking.endDate).getTime()
    return currentTime > bookingEndDate
  }).sort((a,b)=> new Date(a.startDate).getTime()- new Date(b.startDate).getTime())

  // currentBooking: start< currenttime < end
  const currentBooking = userBookings.filter(booking => {
    let bookingStartDate =  new Date(booking.startDate).getTime()
    let bookingEndDate =  new Date(booking.endDate).getTime()
    return bookingStartDate < currentTime && currentTime < bookingEndDate
  }).sort((a,b)=> new Date(a.startDate).getTime()- new Date(b.startDate).getTime())

  // futureBooking : currentTime < start
  const futureBooking = userBookings.filter(booking => {
    let bookingStartDate =  new Date(booking.startDate).getTime()
    return currentTime < bookingStartDate
  }).sort((a,b)=> new Date(a.startDate).getTime()- new Date(b.startDate).getTime())

  useEffect(()=> {
    dispatch(thunkUserBookings());
    return () => dispatch(clearAllBookings());
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />

  return (
    <div className='width-max-1300 mrg-l-r-auto'>
      <h1 className='txt-center'>Manage Your Bookings</h1>
      <div>
        <div>
          <h2>Past Trips</h2>
          {pastBookings.map(element=>
            <BookingCard booking={element} key={element.id}/>
          )}
        </div>

        <div>
          <h2>Current Trips</h2>
          {currentBooking.map(element=>
            <BookingCard booking={element} key={element.id}/>
          )}
        </div>

        <div>
          <h2>Future Trips</h2>
          {futureBooking.map(element=>
            <BookingCard booking={element} bookingPeriod="future" key={element.id}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageBookingPage;
