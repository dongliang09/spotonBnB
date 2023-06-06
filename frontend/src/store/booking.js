import { csrfFetch } from './csrf';

const SET_ALL_BOOKINGS = 'bookings/setAllBookings';
const CLEAR_ALL_BOOKINGS = 'bookings/clearAllBookings';

export const setAllBookings = (bookings) => {
  return {
    type: SET_ALL_BOOKINGS,
    payload: bookings
  };
};

export const clearAllBookings = () => {
  return {
    type: CLEAR_ALL_BOOKINGS
  };
};

// ===========thunk action creator=============

export const thunkGetAllBookings = (spotId) => async dispatch => {
  // dispatch(clearAllBookings());
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await response.json();
  dispatch(setAllBookings(data.Bookings));
  return response;
};

export const thunkCreateBooking = (spotId, bookingData) => async dispatch => {
  // console.log(bookingData)
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(thunkGetAllBookings(spotId));
    return
  }
  return response;
};

//======================== reducer =================
const initialState = { allBookings: {} };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ALL_BOOKINGS:
      newState = {...state};
      newState.allBookings = normalizeData(action.payload)
      return newState;
    case CLEAR_ALL_BOOKINGS:
      newState = {...state};
      newState.allBookings = initialState.allBookings;
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;

function normalizeData(dataArr) {
    let newObj = {};
    dataArr.forEach(element=> {
      newObj[element.startDate.substring(0,10)] = element;
    })
    return newObj
}
