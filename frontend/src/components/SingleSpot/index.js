import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot } from '../../store/spot';
import { thunkGetReviews } from '../../store/review';
import OpenModalButton from '../OpenModalButton/';
import ReviewFormModal from "../ReviewModal";
import './SingleSpot.css'

function SingleSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state=>state.spots.singleSpot);
    const spotReviewObj = useSelector(state=>state.reviews.spot);
    const spotReviewVal = Object.values(spotReviewObj);
    const spotReview = spotReviewVal.sort((a,b)=>( new Date(b.updatedAt) - new Date(a.updatedAt)));
    const defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'];

    useEffect(()=> {
      dispatch(thunkGetOneSpot(spotId));
      dispatch(thunkGetReviews(spotId));
    }, [dispatch])

    return (
      <div className="oneSpotContainer mrg-auto">
        <h1>{oneSpot.name}</h1>
        <h3>{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</h3>
        <div className="grid-50-50">
          <div className="oneSpotPreviewImgDiv">
            <img className="width100"
              src ={ oneSpot.SpotImages === undefined ? defaultImgSrc :
                oneSpot.SpotImages.find(element => element.preview === true) === undefined ? defaultImgSrc :
                  oneSpot.SpotImages.find(element => element.preview === true).url}
              alt='spot preview'/>
          </div>
          <div className="oneSpotOtherImgs flx mrg5">
              { oneSpot.SpotImages === undefined ? null :
                oneSpot.SpotImages.filter(element => element.preview === false)
                  .map(element=>(
                    <div className="notPreviewContainer mrg-r-5" key={element.id}>
                      <img src={element.url} className="width100" alt="other images"/>
                    </div>))}
          </div>
        </div>
        <div className="grid oneSpotInfo">
          <div>
            <h1>Hosted by { oneSpot.Owner===undefined ?
              null : oneSpot.Owner.firstName} { oneSpot.Owner===undefined ?
                null :oneSpot.Owner.lastName}</h1>
            <p>{oneSpot.description}</p>
          </div>
          <div>
            <div className="flx-center-space mrg10">
              <div>
                <strong className="font15">${oneSpot.price}</strong> night
              </div>
              <div className="">
                <i className="fas fa-star"></i> {oneSpot.avgStarRating === null ?
                  "New" : Number(oneSpot.avgStarRating).toFixed(2)} {oneSpot.numReviews === 0 ? null :
                    oneSpot.numReviews === 1 ? "· 1 Review" : `· ${oneSpot.numReviews} reviews`}
              </div>
            </div>
            <div className="flx-center mrg-auto">
              <button className="reserveBtn" onClick={()=>alert('Feature coming soon')}>Reserve</button>
            </div>
          </div>

        </div>
        <hr />
        <div>
          <h1><i className="fas fa-star"></i> {oneSpot.avgStarRating === null ?
                "New" : Number(oneSpot.avgStarRating).toFixed(2)} {oneSpot.numReviews === 0 ? null :
                  oneSpot.numReviews === 1 ? "· 1 Review" : `· ${oneSpot.numReviews} reviews`}</h1>

          {oneSpot && oneSpot.Owner && sessionUser && oneSpot.Owner.id !== sessionUser.id &&
              !(spotReview.find(element => element.userId === sessionUser.id)) &&
              <p>
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={<ReviewFormModal spotId={spotId}/>}
                />
              </p>}

          {oneSpot && oneSpot.Owner && sessionUser && oneSpot.Owner.id !== sessionUser.id &&
              oneSpot.numReviews === 0 &&
              <p>Be the first to post a review!</p>}

          {spotReview.map(element=> <div key={element.id}>
              <h3 className="mrg-b-5">{element.User===undefined ? null :element.User.firstName}</h3>
              <h4 className="mrg-t-b-0">{month[new Date(element.createdAt).getMonth()]} {new Date(element.createdAt).getFullYear()}</h4>
              <p>{element.review}</p>
            </div>)}


        </div>
      </div>
    )
}

export default SingleSpot;
