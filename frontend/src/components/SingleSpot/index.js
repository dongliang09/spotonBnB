import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot } from '../../store/spot';
import './SingleSpot.css'

function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const oneSpot = useSelector(state=>state.spots.singleSpot)
    // const oneSpot =  Object.values(spotObj);
    // console.log(oneSpot)

    useEffect(()=> {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch])


    return (
      <div className="oneSpotContainer">
        <h1>{oneSpot.name}</h1>
        <h3>{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</h3>
      </div>
    )
}

export default SingleSpot;
