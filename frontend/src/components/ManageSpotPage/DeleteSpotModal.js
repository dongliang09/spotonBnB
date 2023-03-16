import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spot';
import { useModal } from "../../context/Modal";

function DeleteSpotModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = () => {
    dispatch(thunkDeleteSpot(spotId))
  }

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Confirm Delete</h1>
      <div className = 'txt-center width100'>
        <p>Are you sure you want to remove this spot the listings?</p>
        <button className="mrg-t-15" onClick={()=>confirmDelete(spotId)}>
            Yes (Delete Spot)
        </button>
        <button className="mrg-t-15">
            No (Keep Spot)
        </button>
      </div>

    </div>
  );
}

export default DeleteSpotModal;
