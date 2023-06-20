import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteBookings } from '../../store/booking';
import { useModal } from "../../context/Modal";

function DeleteBookingModal({bookingId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmDelete = () => {
    dispatch(thunkDeleteBookings(bookingId))
      .then(closeModal);
    history.push("/bookings/current");
  }

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Confirm Delete</h1>
      <div className = 'flx-col-center width100'>
        <p>Are you sure you want to remove this booking?</p>
        <button className="height25rem width100 bg-lgcoral color-white mrg-t-15 bor-0p bor-rad-5 "
          onClick={()=>confirmDelete(bookingId)}>
            Yes (Delete Booking)
        </button>
        <button className=" height25rem width100 bg-gray color-white mrg-t-15 bor-0p bor-rad-5 "
          onClick={()=>closeModal()}>
            No (Keep Booking)
        </button>
      </div>

    </div>
  );
}

export default DeleteBookingModal;
