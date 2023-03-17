import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import StarRating from './StarRating';
import { thunkCreateReviews, thunkGetReviews } from '../../store/review';
import { thunkGetOneSpot } from '../../store/spot';

function ReviewFormModal({spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const { closeModal } = useModal();


  useEffect(()=> {
    if (review.length > 9 && rating > 0) setDisable(false);
    else setDisable(true);
  }, [review, rating])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(thunkCreateReviews(spotId,{review, stars: rating}))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
    await dispatch(thunkGetOneSpot(spotId));
    await dispatch(thunkGetReviews(spotId));
    history.push(`/spots/${spotId}`);
  }

  const onChange = (e) => {
    setRating(e);
  };

  return (
    <div className='flx-col-center width-content pad15 mrg15'>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit} className = 'txt-center width100'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className='user-err'>{error}</li>
          ))}
        </ul>
        <textarea
          type="text" placeholder='Leave your review here...'
          value={review} rows={5}
          onChange={(e) => setReview(e.target.value)}
          className = 'dis-block width100'
        />
        <div>
        <div className='flx-center'>
            <StarRating disabled={false} onChange={onChange} rating={rating}/>
            <div className='flx-col-mid'>Stars</div>
        </div>
        </div>
        <button type="submit" disabled={disableBtn}
          className="">
            Submit Your Review
        </button>
      </form>

    </div>
  );
}

export default ReviewFormModal;
