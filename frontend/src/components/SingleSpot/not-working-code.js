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

    const [previewUrl, setPreview] = useState(defaultImgSrc);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0.00);
    const [numReview, setNumReview] = useState(0);
    console.log(oneSpot)
    // const checkOneSpotNotExist = Object.values(oneSpot).length === 0;
    // const checkSpotImageNotExist = checkOneSpotNotExist ? true :
    //   Object.values(oneSpot.SpotImages).length === 0;
    // console.log(checkSpotImageNotExist)
    // const previewUrl = checkSpotImageNotExist ? defaultImgSrc : oneSpot.SpotImages.find(element => {
    //   //find return the first element
    //   return element.preview === true
    // })?.url;
    // const otherSpotImgArr = checkOneSpotNotExist ? null : oneSpot.SpotImages.filter(element => {
    //   // filter return an array
    //   return element.preview === false
    // });
    // const name = checkOneSpotNotExist ? null : oneSpot.name;
    // const city = checkOneSpotNotExist ? null : oneSpot.city;
    // const state = checkOneSpotNotExist ? null : oneSpot.state;
    // const country = checkOneSpotNotExist ? null : oneSpot.country;
    // const hostFirstName = checkOneSpotNotExist ? null : oneSpot.Owner.firstName;
    // const hostLastName = checkOneSpotNotExist ? null : oneSpot.Owner.lastName;
    // const description = checkOneSpotNotExist ? null : oneSpot.description;
    // const price = checkOneSpotNotExist ? null : Number(oneSpot.price).toFixed(2);
    // const rating = checkOneSpotNotExist ? null : Number(oneSpot.avgStarRating).toFixed(2);
    // const numReview = checkOneSpotNotExist ? null : oneSpot.numReviews;

    function findPreview() {
        let previewResult = oneSpot.SpotImages.find(element => {
          //find return the first element
          return element.preview === true
        })
       if (Object.values(oneSpot.SpotImages).length !== 0 && previewResult )
        setPreview(previewResult.url);

    }

    useEffect(()=> {
      dispatch(thunkGetOneSpot(spotId));
      setName(oneSpot.name);
      setCity(oneSpot.city);
      setState(oneSpot.state);
      setCountry(oneSpot.country);
      setHostFirstName(oneSpot.hostFirstName);
      setHostLastName(oneSpot.hostLastName);
      setDescription(oneSpot.description);
      setPrice(oneSpot.price);
      setRating(oneSpot.rating);
      setNumReview(oneSpot.numReview);
      findPreview(); //set preview
    }, [dispatch])

    console.log("render")

    return (
      <div className="oneSpotContainer">
        <h1>{name}</h1>
        <h3>{city}, {state}, {country}</h3>
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
