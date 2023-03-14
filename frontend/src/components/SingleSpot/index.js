import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot } from '../../store/spot';
import './SingleSpot.css'

function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const oneSpot = useSelector(state=>state.spots.singleSpot)

    console.log(oneSpot)
    const checkOneSpotExist = Object.values(oneSpot).length === 0;


    // need to check if SpotImage.length === 0

    const previewImg = checkOneSpotExist ? null : oneSpot.SpotImages.find(element => {
      //find return the first element
      return element.preview === true
    });
    // const previewUrl = "abc"
    const previewUrl= previewImg.url;
    // console.log(previewUrl)
    const otherSpotImgArr = checkOneSpotExist ? null : oneSpot.SpotImages.filter(element => {
      // filter return an array
      return element.preview === false
    });
    const hostFirstName = checkOneSpotExist ? null : oneSpot.Owner.firstName;
    const hostLastName = checkOneSpotExist ? null : oneSpot.Owner.lastName;
    const description = checkOneSpotExist ? null : oneSpot.description;
    const price = checkOneSpotExist ? null : Number(oneSpot.price).toFixed(2);
    const rating = checkOneSpotExist ? null : Number(oneSpot.avgStarRating).toFixed(2);
    const numReview = checkOneSpotExist ? null : oneSpot.numReviews;

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
            <h1>Hosted by {hostFirstName} {hostLastName}</h1>
            <p>{description}</p>
          </div>
          <div>
            <div>
              ${price}night  <i className="fas fa-star"></i> {rating} {numReview} reviews
            </div>
            <button onClick={()=>alert('Feature coming soon')}>Reserve</button>
          </div>

        </div>
      </div>
    )
}

export default SingleSpot;
