import { csrfFetch } from './csrf';

const SET_REVIEWS = 'spots/setReviews';
const CLEAR_REVIEWS = 'spots/clearReviews';

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  };
};

export const clearReviews = () => {
  return {
    type: CLEAR_REVIEWS
  };
};


// ===========thunk action creator=============

export const thunkGetReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  dispatch(setReviews(data.Reviews));
  return response;
};

export const thunkCreateReviews = (spotId, review) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  });
  return response;
};

export const thunkDeleteReviews = (spotId, reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  return response;
};

//======================== reducer =================
const initialState = { spot: {} };

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEWS:
      newState = {...state};
      newState.spot = normalizeData(action.payload);
      return newState;
    case CLEAR_REVIEWS:
      newState = {...state};
      newState.spot = initialState.spot;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;

function normalizeData(dataArr) {
    let newObj = {};
    dataArr.forEach(element=> {
        newObj[element.id] = element;
    })
    return newObj
}
