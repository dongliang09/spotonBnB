import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearOneSpot, thunkGetOneSpot } from '../../store/spot';
import { clearReviews, thunkGetReviews } from '../../store/review';
import OpenModalButton from '../OpenModalButton/';
import ReviewFormModal from "../ReviewModal";
import DeleteReviewModal from './DeleteReviewModal';
import BookingForm from "./BookingForm";
import ThisPlaceOffer from "./ThisPlaceOffer";

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
        <div className="grid-50-50 gap10p">
          <img className="width100 height300p obj-fit-cover bor-rad-15"
            src ={ oneSpot.SpotImages === undefined ? defaultImgSrc :
              oneSpot.SpotImages.find(element => element.preview === true) === undefined ? defaultImgSrc :
                oneSpot.SpotImages.find(element => element.preview === true).url}
            onError={(e)=>{e.target.src = defaultImgSrc}}
            alt='spot preview'/>
          <div id="singleSpotOtherPreviewImgs" className="grid-2x2-img gap10p width500p height300p">
              { oneSpot.SpotImages === undefined ? null :
                oneSpot.SpotImages.filter(element => element.preview === false)
                  .map((element, idx)=>(
                      <img src={element.url}
                        key={element.id} className={"previewImg" +idx +" width100 height100 obj-fit-cover bor-rad-15"} alt="other images "
                        onError={(e)=>{e.target.src = defaultImgSrc}}/>
                    ))}
          </div>
        </div>
        <div className="grid-7-4 mrg-t-5 ">
          <div className="mrg-r-15 pad15">
            <h1>Hosted by { oneSpot.Owner===undefined ?
              null : oneSpot.Owner.firstName} { oneSpot.Owner===undefined ?
                null :oneSpot.Owner.lastName}</h1>
            <p className="font115">{oneSpot.description}</p>
            <ThisPlaceOffer />
          </div>
          <div  className="pad15 mrg15 boxShadow-0-1-5-1-gray bor-rad-15 height-fit">
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
