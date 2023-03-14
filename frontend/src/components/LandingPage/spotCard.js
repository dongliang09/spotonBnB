import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SpotCard({spot}) {
  const history = useHistory();
  let defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  const [imgSrc, setImgSrc] = useState(spot.previewImage === null ?
                                        defaultImgSrc : spot.previewImage)
  const avgRating = spot.avgRating === null ? "New" : Number(spot.avgRating).toFixed(2);

  function spotDetail() {
    //go to spot detail route
    history.push(`/spots/${spot.id}`);
  }

  return (
    // <Link to={`/spots/${spot.id}`} >
    <div className="spotCard" onClick={spotDetail}>
      <div className="spotCardImgContainer">
        <img className="width100"
          src={imgSrc} alt={spot.name}
          onError={ () => {
            setImgSrc(defaultImgSrc)
          }}/>
      </div>
      <div className="flx-center-space">
        <div className="flx">
          {spot.city},{spot.state}
        </div>
        <div><i className="fas fa-star"></i> {avgRating}</div>
      </div>
      ${spot.price} night
      <span className="spotCardTooltip">{spot.name}</span>
    </div>
    // </Link>
  )
}

export default SpotCard;
