import { csrfFetch } from './csrf';

const SET_REVIEWS = 'spots/setReviews';

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  };
};


// ===========thunk action creator=============

export const thunkGetReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  // console.log(data)
  dispatch(setReviews(data.Reviews));
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
