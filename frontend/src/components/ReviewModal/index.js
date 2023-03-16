import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";

function ReviewFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [review, setReview] = useState('');
  const [star, setStar] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const { closeModal } = useModal();


  useEffect(()=> {
    if (review.length > 9 && star > 0) setDisable(false);
    else setDisable(true);
  }, [review, star])

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

  return (
    <div className='flx-col-center width-content pad15'>
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
        <button type="submit" disabled={disableBtn}
          className="mrg-t-15">
            Submit Your Review
        </button>
      </form>

    </div>
  );
}

export default ReviewFormModal;
