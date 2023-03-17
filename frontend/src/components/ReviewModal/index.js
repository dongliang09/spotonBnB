import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";

function ReviewFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [review, setReview] = useState('');
  // const [star, setStar] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const [rating, setRating] = useState(0);
  const { closeModal } = useModal();


  useEffect(()=> {
    if (review.length > 9 && rating > 0) setDisable(false);
    else setDisable(true);
  }, [review, rating])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch("some action to submit reviews")
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
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
          type="text"
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
