import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBookings, thunkUpdateBooking } from '../../store/booking';
import { useModal } from "../../context/Modal";

import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function UpdateBookingModal({booking}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const allBookings = Object.values(useSelector(state=> state.bookings.allBookings))
  const relatedBooking = allBookings.filter(element=> Number(element.spotId) === Number(booking.id))

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null)

  useEffect(()=>{
    setStartDate(moment(new Date(booking.startDate)))
    setEndDate(moment(new Date(booking.endDate)))
    // await dispatch(thunkGetAllBookings(booking.spotId))
  }, [])

  useEffect(()=>{ (async ()=>{
    await dispatch(thunkGetAllBookings(booking.spotId))
  })() // anonymous async function call
  }, [dispatch])

  const confirmUpdate = async (e) => {
    e.preventDefault()
    let startTime = startDate.format().substring(0,10)
    let endTime = endDate.format().substring(0,10)
    setError(null)
    try {
      await dispatch(thunkUpdateBooking(booking.id, {startDate:startTime, endDate:endTime}))
      closeModal()
    } catch (error) {
      let err = await error.json()
      setError(err.message)
    }
    history.push("/bookings/current");
  }

  function alreadyBooked(momentDate) {
    let isOutsideBookings = true
    let date = new Date(momentDate.format()).getTime()
    for (let i = 0; i < relatedBooking.length; i++) {
      let startDate = new Date(relatedBooking[i].startDate).getTime()
      let endDate = new Date(relatedBooking[i].endDate).getTime() + 24 * 60 * 60 * 1000;
      // 1 day is 24 hours * 60 min * 60 secs * 1000 ms
      if ( startDate <= date && date <= endDate) {
        isOutsideBookings = false
      }
    }
    return !isOutsideBookings
  }

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Update Schedule</h1>
      { error !== null && <div className="user-err pad15 font-weight600 width300p ">{error}</div>}
      <div className = ''>
        <form onSubmit={(e)=>confirmUpdate(e)}>
          <DateRangePicker
            startDate={startDate}
            startDateId="update_booking_start_date"
            endDate={endDate}
            endDateId="update_booking_end_date"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate)
              setEndDate(endDate)
            }}
            isDayBlocked={alreadyBooked}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput)=> setFocusedInput(focusedInput)}
            required={true}
            // noBorder
          />
          <div className='mrg-t-b-13 txt-center'>
            <button
              className='bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600 mrg-r-5'>
                Update
            </button>
            <button type="button" onClick={()=>closeModal()}
              className='bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600'>
              Cancel
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default UpdateBookingModal;
