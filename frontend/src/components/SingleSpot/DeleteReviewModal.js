import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkGetOneSpot } from '../../store/spot';
import { thunkGetReviews, thunkDeleteReviews } from '../../store/review';
import { useModal } from "../../context/Modal";

function DeleteReviewModal({spotId, reviewId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmDelete = async () => {
    await dispatch(thunkDeleteReviews(spotId, reviewId))
      .then(closeModal);
    await dispatch(thunkGetReviews(spotId));
    await dispatch(thunkGetOneSpot(spotId));
    history.push(`/spots/${spotId}`);
  }

  return (
    <div className='flx-col-center width-content pad15'>
      <h1>Confirm Delete</h1>
      <div className = 'flx-col-center width100'>
        <p>Are you sure you want to delete this review?</p>
        <button className="height25rem width100 bg-lgcoral color-white mrg-t-15"
          onClick={()=>confirmDelete(spotId, reviewId)}>
            Yes (Delete Review)
        </button>
        <button className=" height25rem width100 bg-gray color-white mrg-t-15"
          onClick={()=>closeModal()}>
            No (Keep Review)
        </button>
      </div>

    </div>
  );
}

export default DeleteReviewModal;
