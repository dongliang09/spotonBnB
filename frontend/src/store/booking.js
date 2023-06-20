import { csrfFetch } from './csrf';

const SET_ALL_BOOKINGS = 'bookings/setAllBookings';
const SET_USER_BOOKINGS = 'bookings/setUserBookings';
const CLEAR_ALL_BOOKINGS = 'bookings/clearAllBookings';

export const setAllBookings = (bookings) => {
  return {
    type: SET_ALL_BOOKINGS,
    payload: bookings
  };
};

export const setUserBookings = (bookings) => {
  return {
    type: SET_USER_BOOKINGS,
    payload: bookings
  };
};

export const clearAllBookings = () => {
  return {
    type: CLEAR_ALL_BOOKINGS
  };
};

// ===========thunk action creator=============

export const thunkUserBookings = () => async dispatch => {
  const response = await csrfFetch(`/api/bookings/current`);
  const data = await response.json();
  if (response.ok) {
    dispatch(setUserBookings(data.Bookings));
  }return data;
};

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
    return response
  } else {
    return response
  }
};

export const thunkUpdateBooking = (bookingId, bookingData) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(bookingData)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(thunkUserBookings());
    return data;
  }
  return response;
};

export const thunkDeleteBookings = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(thunkUserBookings());
  }
  return response;
};

//======================== reducer =================
const initialState = { allBookings: {}, userBooking: {} };

const bookingReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ALL_BOOKINGS:
      newState = {...state};
      newState.allBookings = normalizeDataWithDate(action.payload)
      return newState;
    case SET_USER_BOOKINGS:
      newState = {...state};
      newState.userBooking = normalizeData(action.payload)
      return newState;
    case CLEAR_ALL_BOOKINGS:
      newState = {...state};
      newState.allBookings = initialState.allBookings;
      newState.userBooking = initialState.userBooking;
      return newState;
    default:
      return state;
  }
};

export default bookingReducer;

function normalizeDataWithDate(dataArr) {
    let newObj = {};
    dataArr.forEach(element=> {
      newObj[element.startDate.substring(0,10)] = element;
    })
    return newObj
}

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element=> {
      newObj[element.id] = element;
  })
  return newObj
}
