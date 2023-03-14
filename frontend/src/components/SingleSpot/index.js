import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot } from '../../store/spot';
import './SingleSpot.css'

function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const oneSpot = useSelector(state=>state.spots.singleSpot)
    let defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

    console.log(oneSpot)

    // function findPreview() {
    //     let previewResult = oneSpot.SpotImages.find(element => {
    //       //find return the first element
    //       return element.preview === true
    //     })
    //    if (Object.values(oneSpot.SpotImages).length !== 0 && previewResult )
    //     setPreview(previewResult.url);

    // }

    useEffect(()=> {
      dispatch(thunkGetOneSpot(spotId));
    }, [dispatch])

    console.log("render")

    return (
      <div className="oneSpotContainer mrg-auto">
        <h1>{oneSpot.name}</h1>
        <h3>{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</h3>
        <div className="grid-50-50">
          <div className="oneSpotPreviewImgDiv">
            <img className="width100"
              src ={ oneSpot.SpotImages.length === 0 ? defaultImgSrc :
                oneSpot.SpotImages.find(element => element.preview === true) === undefined ? defaultImgSrc :
                  oneSpot.SpotImages.find(element => element.preview === true).url}
              alt='spot preview'/>
          </div>
          <div className="oneSpotOtherImgs flx mrg5">
              {oneSpot.SpotImages.length === 0 ? null :
                oneSpot.SpotImages.filter(element => element.preview === false)
                  .map(element=>(
                    <div className="notPreviewContainer mrg-r-5">
                      <img src={element.url} className="width100" alt="other images"/>
                    </div>))}
          </div>
        </div>
        <div className="grid oneSpotInfo">
          <div>
            <h1>Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}</h1>
            <p>{oneSpot.description}</p>
          </div>
          <div>
            <div className="flx-center-space mrg10">
              <div>
                <span className="font15">${oneSpot.price}</span> night
              </div>
              <div className="">
                <i className="fas fa-star"></i> {oneSpot.rating} {oneSpot.numReviews} reviews
              </div>
            </div>
            <div className="flx-center mrg-auto">
              <button className="reserveBtn" onClick={()=>alert('Feature coming soon')}>Reserve</button>
            </div>
          </div>

        </div>
      </div>
    )
}

export default SingleSpot;
