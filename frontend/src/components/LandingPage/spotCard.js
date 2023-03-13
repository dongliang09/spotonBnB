import React from "react";
import { useState } from "react";

function SpotCard({spot}) {
  let defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  const [imgSrc, setImgSrc] = useState(spot.previewImage === null ?
                                        defaultImgSrc : spot.previewImage)
  const avgRating = spot.avgRating === null ? 0 : spot.avgRating;
  const avgRating2 = avgRating.toFixed(2);

  return (
    <div className="spotCard">
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
  )
}

export default SpotCard;
