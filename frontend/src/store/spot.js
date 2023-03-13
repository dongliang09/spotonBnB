import { csrfFetch } from './csrf';

const SET_ALL_SPOTS = 'spots/setAllSpots';

const setAllSpots = (spots) => {
  return {
    type: SET_ALL_SPOTS,
    payload: spots
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


//======================== reducer =================
const initialState = { allSpots: {},  singleSpot:{}};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ALL_SPOTS:
      newState = {...state};
      newState.allSpots = normalizeData(action.payload)
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
