import React from "react";
import { useState } from "react";

function SpotCard({spot}) {
  let defaultImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  const [imgSrc, setImgSrc] = useState(spot.previewImage === null ?
                                        defaultImgSrc : spot.previewImage)

  return (
    <div className="spotCard">
      <div className="spotCardImgContainer" data-tool-tip={spot.name}>
        <img className="spotCardImg"
          src={imgSrc} alt={spot.name}
          data-tool-tip={spot.name}
          onError={ () => {
            setImgSrc(defaultImgSrc)
          }}/>
      </div>
      <div className="spotCardGeoRating">
        <div  className="spotCardGeo">
          {spot.city},{spot.state}
        </div>
        <div>Rating</div>
      </div>
      ${spot.price} night
    </div>
  )
}

export default SpotCard;
