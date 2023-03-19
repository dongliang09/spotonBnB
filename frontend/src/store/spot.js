import { csrfFetch } from './csrf';

const SET_ALL_SPOTS = 'spots/setAllSpots';
const SET_ONE_SPOT = 'spots/setOneSpot';
const CLEAR_ALL_SPOT = 'spots/clearAllSpots';
const CLEAR_ONE_SPOT = 'spots/clearOneSpot';

export const setAllSpots = (spots) => {
  return {
    type: SET_ALL_SPOTS,
    payload: spots
  };
};

export const setOneSpot = (spot) => {
  return {
    type: SET_ONE_SPOT,
    payload: spot
  };
};

export const clearAllSpot = () => {
  return {
    type: CLEAR_ALL_SPOT
  };
};

export const clearOneSpot = () => {
  return {
    type: CLEAR_ONE_SPOT
  };
};

// ===========thunk action creator=============

export const thunkGetAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setAllSpots(data.Spots));
  return response;
};

export const thunkGetOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(setOneSpot(data));
  return response;
};

export const thunkCreateSpot = (spotData) => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(thunkGetOneSpot(data.id));
    return data.id;
  }
  return response;
};

export const thunkCurrentUserSpot = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current');
  const data = await response.json();
  if (response.ok) {
    dispatch(setAllSpots(data.Spots));
  }return data;
};

export const thunkUpdateSpot = (spotId, spotData) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spotData)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(thunkGetOneSpot(data.id));
    return data.id;
  }
  return response;
};

export const thunkDeleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(thunkCurrentUserSpot());
  }
  return response;
};

export const thunkCreateSpotImg = (spotId, data) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response;
};

//======================== reducer =================
const initialState = { allSpots: {},  singleSpot:{}};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ALL_SPOTS:
      newState = {...state};
      newState.allSpots = normalizeData(action.payload)
      return newState;
    case SET_ONE_SPOT:
      newState = {...state};
      newState.singleSpot = action.payload;
      return newState;
    case CLEAR_ALL_SPOT:
      newState = {...state};
      newState.allSpots = initialState.allSpots;
      return newState;
    case CLEAR_ONE_SPOT:
      newState = {...state};
      newState.singleSpot = initialState.singleSpot;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;

function normalizeData(dataArr) {
    let newObj = {};
    dataArr.forEach(element=> {
        newObj[element.id] = element;
    })
    return newObj
}
