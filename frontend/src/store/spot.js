import { csrfFetch } from './csrf';

const SET_ALL_SPOTS = 'spots/setAllSpots';
const SET_ONE_SPOT = 'spots/setOneSpot';

const setAllSpots = (spots) => {
  return {
    type: SET_ALL_SPOTS,
    payload: spots
  };
};

const setOneSpot = (spot) => {
  return {
    type: SET_ONE_SPOT,
    payload: spot
  };
};

// ===========thunk action creator=============

export const thunkGetAllSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  // console.log(data)
  dispatch(setAllSpots(data.Spots));
  return response;
};

export const thunkGetOneSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  console.log(data)
  dispatch(setOneSpot(data));
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
