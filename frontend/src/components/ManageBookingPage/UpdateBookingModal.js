import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBookings, thunkUpdateBooking } from '../../store/booking';
import { useModal } from "../../context/Modal";

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function UpdateBookingModal({booking}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const confirmUpdate = () => {
    dispatch(thunkUpdateBooking(booking.id, {startDate, endDate}))
      .then(closeModal);
    history.push("/bookings/current");
  }

  useEffect(()=>{
    setStartDate(booking.startDate)
    setEndDate(booking.endDate)
    dispatch(thunkGetAllBookings(booking.spotId))
  }, [dispatch])

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Update Schedule</h1>
      <div className = ''>
        <form onSubmit={()=>confirmUpdate()}>
          <div>
            <button>Update</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default UpdateBookingModal;
