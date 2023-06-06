import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearOneSpot, thunkGetOneSpot } from '../../store/spot';
import { clearReviews, thunkGetReviews } from '../../store/review';
import OpenModalButton from '../OpenModalButton/';
import ReviewFormModal from "../ReviewModal";
import DeleteReviewModal from './DeleteReviewModal';
import BookingForm from "./BookingForm";

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
      return () => {
        dispatch(clearOneSpot());
        dispatch(clearReviews());
      };
    }, [dispatch])

    return (
      <div className="width-max-1000 mrg-auto">
        <h1>{oneSpot.name}</h1>
        <h3>{oneSpot.city}, {oneSpot.state}, {oneSpot.country}</h3>
        <div className="grid-50-50">
          <div className="width500p height400p flx-col-mid">
            <img className="width100"
              src ={ oneSpot.SpotImages === undefined ? defaultImgSrc :
                oneSpot.SpotImages.find(element => element.preview === true) === undefined ? defaultImgSrc :
                  oneSpot.SpotImages.find(element => element.preview === true).url}
              onError={(e)=>{e.target.src = defaultImgSrc}}
              alt='spot preview'/>
          </div>
          <div className="grid-2x2 width500p mrg5">
              { oneSpot.SpotImages === undefined ? null :
                oneSpot.SpotImages.filter(element => element.preview === false)
                  .map(element=>(
                    <div className="height200p mrg-r-5" key={element.id}>
                      <img src={element.url} className="width100 height-max-200p" alt="other images"
                        onError={(e)=>{e.target.src = defaultImgSrc}}/>
                    </div>))}
          </div>
        </div>
        <div className="grid grid-5-2">
          <div className="mrg-r-15">
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
              <div className="flx-mid">
              <div>
                <i className="fas fa-star"></i> {oneSpot.avgStarRating === null ?
                  "New" : Number(oneSpot.avgStarRating).toFixed(2)} {oneSpot.numReviews === 0 ? null :
                    oneSpot.numReviews === 1 ? "· 1 Review" : `· ${oneSpot.numReviews} reviews`}
              </div>

              </div>
            </div>

            <BookingForm dailyPrice={oneSpot.price}/>
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
              {sessionUser && element.userId === sessionUser.id && <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal spotId={element.spotId} reviewId={element.id}/>}
              />}
            </div>)}


        </div>
      </div>
    )
}

export default SingleSpot;
