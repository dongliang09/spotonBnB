import React from "react";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSpot, thunkGetOneSpot, thunkUpdateSpot, thunkCreateSpotImg } from '../../store/spot';

function CreateSpotPage({formType}) {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const editSpot = useSelector(state=> state.spots.singleSpot);
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");
  const [otherImgArr, setOtherImgArr] = useState([]);
  const [otherImg1, setOtherImg1] = useState("");
  const [otherImg2, setOtherImg2] = useState("");
  const [otherImg3, setOtherImg3] = useState("");
  const [otherImg4, setOtherImg4] = useState("");
  const [error, setError] = useState({});
  const [imgError, setImgError] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //hard code long and lat at the moment
  //need to value-control other image URL

  // upon successful submit,
  // jump to the spot detail page for new spot
  function cleanupState () {
    setError({});
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreview("");
    setOtherImgArr([]);
    setOtherImg1("");
    setOtherImg2("");
    setOtherImg3("");
    setOtherImg4("");
    setSubmitted(false);
  }

  async function checkInputError(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      // assume it is successful fetch all the time at the moment
      // need to add error handler for fetch request
      // hard code lat and lng right now
      let resultId;
      if (formType === "create") {
        resultId = await dispatch(thunkCreateSpot({
            address, city, state, country, name, description, price,
            lat: 0, lng: 0
        }))
        .catch(
          async (res) => {
            const data = await res.json();
            console.log(data)
            if (data && data.errors) setError(data.errors);
          }
        );
        await dispatch(thunkCreateSpotImg(resultId, {
            url: preview, preview: true
        }))
        .catch(
            async (res) => {
              const data = await res.json();
              console.log(data)
              if (data && data.errors) setImgError([...imgError, Object.values(data.errors)]);
            }
          );

        if(otherImg1.length !== 0) {
            await dispatch(thunkCreateSpotImg(resultId, {
                url: otherImg1, preview: false
            }))
            .catch(
                async (res) => {
                  const data = await res.json();
                  console.log(data)
                  if (data && data.errors) setImgError([...imgError, Object.values(data.errors)]);
                }
              );
        }
        if(otherImg2.length !== 0) {
            await dispatch(thunkCreateSpotImg(resultId, {
                url: otherImg2, preview: false
            }))
            .catch(
                async (res) => {
                  const data = await res.json();
                  console.log(data)
                  if (data && data.errors) setImgError([...imgError, Object.values(data.errors)]);
                }
              );
        }
        if(otherImg3.length !== 0) {
            await dispatch(thunkCreateSpotImg(resultId, {
                url: otherImg3, preview: false
            }))
            .catch(
                async (res) => {
                  const data = await res.json();
                  console.log(data)
                  if (data && data.errors) setImgError([...imgError, Object.values(data.errors)]);
                }
              );
        }
        if(otherImg4.length !== 0) {
            await dispatch(thunkCreateSpotImg(resultId, {
                url: otherImg4, preview: false
            }))
            .catch(
                async (res) => {
                  const data = await res.json();
                  console.log(data)
                  if (data && data.errors) setImgError([...imgError, Object.values(data.errors)]);
                }
              );
        }

        if (Object.values(imgError).length === 0) {
          cleanupState()
          history.push(`/spots/${resultId}`);
        }

      } else {
        dispatch(thunkUpdateSpot(spotId, {
            address, city, state, country, name, description, price,
            lat: 0, lng: 0
        }));
        history.push(`/spots/${spotId}`);
      }


    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=> {
    if (formType === "edit" && Object.values(editSpot).length !== 0) {
        setCountry(editSpot.country);
        setAddress(editSpot.address);
        setCity(editSpot.city);
        setState(editSpot.state);
        setDescription(editSpot.description);
        setName(editSpot.name);
        setPrice(editSpot.price);
        //   setPreview(editSpot.SpotImages."something find preview true");
    }
  }, [editSpot])

  useEffect(()=>{ //validate input
    let errors = {};
    if (country.length === 0) errors.country = "Country is required";
    if (address.length === 0) errors.address = "Address is required";
    if (city.length === 0) errors.city = "City is required";
    if (state.length === 0) errors.state = "State is required";
    if (description.length < 30) errors.description = "Description needs a minimum of 30 characters";
    if (name.length === 0) errors.name = "Name is required";
    if (price.length === 0) errors.price = "Price is required";
    if (preview.length === 0) errors.preview = "Preview image is required";
    if (otherImg1.length > 0 && !(otherImg1.endsWith(".png") || otherImg1.endsWith(".jpg") || otherImg1.endsWith(".jpeg")))
        errors.otherImg1 = "Image URL must end in .png, .jpg, or .jpeg";
    if (otherImg2.length > 0 && !(otherImg2.endsWith(".png") || otherImg2.endsWith(".jpg") || otherImg2.endsWith(".jpeg")))
        errors.otherImg2 = "Image URL must end in .png, .jpg, or .jpeg";
    if (otherImg3.length > 0 && !(otherImg3.endsWith(".png") || otherImg3.endsWith(".jpg") || otherImg3.endsWith(".jpeg")))
        errors.otherImg3 = "Image URL must end in .png, .jpg, or .jpeg";
    if (otherImg4.length > 0 && !(otherImg4.endsWith(".png") || otherImg4.endsWith(".jpg") || otherImg4.endsWith(".jpeg")))
        errors.otherImg4 = "Image URL must end in .png, .jpg, or .jpeg";
    setError(errors);
  },[country, address, city, state, description, name, price, preview, otherImg1, otherImg2, otherImg3, otherImg4])

  useEffect(()=> {
    if (formType === "edit")
        dispatch(thunkGetOneSpot(spotId));
    return (() => { //clean up input fields before mouting ?
      cleanupState();
    })
  }, [])

  function oneKeyTestInfo () {
      setCountry("USA");
      setAddress("1000 Boardway Street");
      setCity("Fun City");
      setState("NY");
      setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum tincidunt venenatis. Donec sit amet diam at dui efficitur suscipit ut in nunc. In eget posuere orci.");
      setName("Happiness1");
      setPrice(5);
  }

  //handle illegal enter
  if (!sessionUser) return <Redirect to="/" />
  if (formType==="edit" && editSpot.ownerId !== sessionUser.id) return <Redirect to="/spots/current" />
  return (
    <div className="flx-col-center">

      {/* <button onClick={() => oneKeyTestInfo()} >Demo Info</button> */}

      <h1>{formType === "edit" ? "Update Your Spot" : "Create a New Spot"}</h1>

      <form onSubmit={(e)=>checkInputError(e)}>

        <ul>
          {submitted && imgError.map((error, idx) => (
            <li key={idx} className='user-err'>{error}</li>
          ))}
        </ul>
        <ul>
          {submitted && Object.values(error).map((error, idx) => (
            <li key={idx} className='user-err'>{error}</li>
          ))}
        </ul>

        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <label htmlFor="create-country">Country</label>
        {submitted && error.country &&
            <span className="user-err"> {error.country}</span>}
        <input id="create-country" placeholder="Country" className="dis-block"
            value={country} onChange={(e)=>setCountry(e.target.value)}/>

        <label htmlFor="create-address">Street Address</label>
        {submitted && error.address &&
            <span className="user-err"> {error.address}</span>}
        <input id="create-address" placeholder="Address" className="dis-block"
            value={address} onChange={(e)=>setAddress(e.target.value)}/>

        <label htmlFor="create-city">City</label>
        {submitted && error.city &&
            <span className="user-err"> {error.city}</span>}
        <input id="create-city" placeholder="City" className="dis-block"
            value={city} onChange={(e)=>setCity(e.target.value)}/>

        <label htmlFor="create-state">State</label>
        {submitted && error.state &&
            <span className="user-err"> {error.state}</span>}
        <input id="create-state" placeholder="State" className="dis-block"
            value={state} onChange={(e)=>setState(e.target.value)}/>
        <hr className="mrg-t-15"/>


        <h3>Describe your place to guests</h3>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea placeholder="Please write at least 30 characters"
            className="dis-block width100 height5rem"
            value={description} onChange={(e)=>setDescription(e.target.value)}/>
        {submitted && error.description &&
            <span className="user-err"> {error.description}</span>}
        <hr  className="mrg-t-15"/>


        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input placeholder="Name of your spot" className="dis-block"
            value={name} onChange={(e)=>setName(e.target.value)}/>
        {submitted && error.name &&
            <span className="user-err"> {error.name}</span>}
        <hr  className="mrg-t-15"/>


        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <label htmlFor="create-price">$</label>
        <input id="create-price" placeholder="price per night (USD)"
            type="number" min="0.01"
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
        {submitted && error.price &&
            <span className="user-err dis-block"> {error.price}</span>}
        <hr  className="mrg-t-15"/>


        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input  placeholder="Preview Image URL" className="dis-block mrg-b-5" type="url"
            value={preview} onChange={(e)=>setPreview(e.target.value)}/>
        {submitted && error.preview &&
            <span className="user-err"> {error.preview}</span>}

        <input  placeholder="Image URL" className="dis-block mrg-b-5" type="url"
            value={otherImg1} onChange={(e)=>setOtherImg1(e.target.value)}/>
        {submitted && error.otherImg1 &&
            <span className="user-err"> {error.otherImg1}</span>}

        <input  placeholder="Image URL" className="dis-block mrg-b-5" type="url"
            value={otherImg2} onChange={(e)=>setOtherImg2(e.target.value)}/>
        {submitted && error.otherImg2 &&
            <span className="user-err"> {error.otherImg2}</span>}

        <input  placeholder="Image URL" className="dis-block mrg-b-5" type="url"
            value={otherImg3} onChange={(e)=>setOtherImg3(e.target.value)}/>
        {submitted && error.otherImg3 &&
            <span className="user-err"> {error.otherImg3}</span>}

        <input  placeholder="Image URL" className="dis-block" type="url"
            value={otherImg4} onChange={(e)=>setOtherImg4(e.target.value)}/>
        {submitted && error.otherImg4 &&
            <span className="user-err"> {error.otherImg4}</span>}
        <hr  className="mrg-t-15"/>


        <div className="flx-center mrg-t-b-15" >
          <button>{formType === "edit" ? "Update Your Spot" : "Create Spot"}</button>
        </div>
      </form>

    </div>
  )
}

export default CreateSpotPage;
