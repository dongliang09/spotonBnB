import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot } from '../../store/spot';
import './SingleSpot.css'

function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const oneSpot = useSelector(state=>state.spots.singleSpot)

    let previewImg;
    let previewUrl;
    let otherSpotImgArr;
    let owner;
    if (oneSpot.SpotImages !== undefined) {
        previewImg = oneSpot.SpotImages.find(element => {
          return element.preview === true
        });
        previewUrl = previewImg.url;
        otherSpotImgArr = oneSpot.SpotImages.find(element => {
          return element.preview === false
        });
    }

    // if (oneSpot.Owner !== undefined) owner = oneSpot.owner;

    useEffect(()=> {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch])


    return (
      <div className="oneSpotContainer">
        <h1>{oneSpot.name}</h1>
        <h3>{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</h3>
        <div className="oneSpotImgContainer">
          <div className="oneSpotPreviewImgDiv">
            <img className="oneSpotPreviewImg"
              src ={previewUrl} alt='spot preview'/>
          </div>
          <div className="oneSpotOtherImgs">
            use mapping for other imgs
          </div>
        </div>
        <div className="oneSpotInfo">
          <div>
            <h1>Hosted by {oneSpot.owner?.firstName} {oneSpot.owner?.lastName}</h1>
          </div>

        </div>
      </div>
    )
}

export default SingleSpot;
