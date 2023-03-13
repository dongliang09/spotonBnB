import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from '../../store/spot';
import './SingleSpot.css'

function SingleSpot() {
    const dispatch = useDispatch();
    const spotObj = useSelector(state=>state.spots.singleSpot)
    const oneSpot =  Object.values(spotObj);
    console.log(oneSpot)

    //load the info from GET all spots when the page load
    useEffect(()=> {
        dispatch("thunk action")
    }, [dispatch])


    return (
      <div className="singleSpotContainer">

      </div>
    )
}

export default SingleSpot;
