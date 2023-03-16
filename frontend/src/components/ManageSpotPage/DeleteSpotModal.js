import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spot';
import { useModal } from "../../context/Modal";

function DeleteSpotModal({spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmDelete = () => {
    dispatch(thunkDeleteSpot(spotId))
      .then(closeModal);
    history.push("/spots/current");
  }

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Confirm Delete</h1>
      <div className = 'flx-col-center width100'>
        <p>Are you sure you want to remove this spot the listings?</p>
        <button className="height25rem width100 bg-lgcoral color-white mrg-t-15"
          onClick={()=>confirmDelete(spotId)}>
            Yes (Delete Spot)
        </button>
        <button className=" height25rem width100 bg-gray color-white mrg-t-15"
          onClick={()=>closeModal()}>
            No (Keep Spot)
        </button>
      </div>

    </div>
  );
}

export default DeleteSpotModal;
