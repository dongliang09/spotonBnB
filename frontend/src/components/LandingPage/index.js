import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllSpot, thunkGetAllSpots } from '../../store/spot';
import SpotCard from "./spotCard";
import './LandingPage.css'
import AboutFooter from "../AboutFooter";

function LandingPage() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots.allSpots)
    const spots =  Object.values(spotsObj);

    //load the info from GET all spots when the page load
    useEffect(()=> {
        dispatch(thunkGetAllSpots())
        return () => dispatch(clearAllSpot());
    }, [dispatch])

    return (
        <div>
            <div className="spotContainer">
                {spots.map(element => {
                    return <SpotCard spot={element} key={element.id}/>
                })}
            </div>
            <AboutFooter />
        </div>
    )
}

export default LandingPage;
