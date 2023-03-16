import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllSpot, thunkGetAllSpots } from '../../store/spot';
import SpotCard from "./spotCard";
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots.allSpots)
    const spots =  Object.values(spotsObj);
    // console.log(spots)

    //load the info from GET all spots when the page load
    useEffect(()=> {
        dispatch(thunkGetAllSpots())
        return () => dispatch(clearAllSpot());
    }, [dispatch])

    return (
        <div className="spotContainer">
            {spots.map(element => {
                return <SpotCard spot={element} key={element.id}/>
            })}
        </div>
    )
}

export default LandingPage;
