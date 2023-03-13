import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SpotCard({spot}) {
  const history = useHistory();
  let defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  const [imgSrc, setImgSrc] = useState(spot.previewImage === null ?
                                        defaultImgSrc : spot.previewImage)
  const avgRating = spot.avgRating === null ? 0 : spot.avgRating;
  const avgRating2 = avgRating.toFixed(2);

  function spotDetail() {
    //go to spot detail route
    history.push(`/spots/${spot.id}`);
  }

  return (
    <Link to={`/spots/${spot.id}`} >
    <div className="spotCard" >
      <div className="spotCardImgContainer">
        <img className="spotCardImg"
          src={imgSrc} alt={spot.name}
          onError={ () => {
            setImgSrc(defaultImgSrc)
          }}/>
      </div>
      <div className="spotCardGeoRating">
        <div className="spotCardGeo">
          {spot.city},{spot.state}
        </div>
        <div><i className="fas fa-star"></i> {avgRating2}</div>
      </div>
      ${spot.price} night
      <span className="spotCardTooltip">{spot.name}</span>
    </div>
    </Link>
  )
}

export default SpotCard;
