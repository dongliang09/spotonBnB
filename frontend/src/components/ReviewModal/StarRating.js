import React, { useState, useEffect } from 'react';

function StarRating({ rating, disabled, onChange }) {

  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  return (
    <div>
      <div className="flx-center font20 mrg15">
        <div className=""
          onMouseEnter={()=>{if(!disabled)setActiveRating(1)}}
          onMouseLeave={()=>{if(!disabled)setActiveRating(rating)}}
          onClick={()=>onChange(1)}
        >
          <i className={activeRating> 0 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className=""
          onMouseEnter={()=>{if(!disabled)setActiveRating(2)}}
          onMouseLeave={()=>{if(!disabled)setActiveRating(rating)}}
          onClick={()=>onChange(2)}
        >
          <i className={activeRating> 1 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className=""
          onMouseEnter={()=>{if(!disabled)setActiveRating(3)}}
          onMouseLeave={()=>{if(!disabled)setActiveRating(rating)}}
          onClick={()=>onChange(3)}
        >
          <i className={activeRating> 2 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className=""
          onMouseEnter={()=>{if(!disabled)setActiveRating(4)}}
          onMouseLeave={()=>{if(!disabled)setActiveRating(rating)}}
          onClick={()=>onChange(4)}
        >
          <i className={activeRating> 3 ? "fas fa-star" : "far fa-star"}></i>
        </div>
        <div className=""
          onMouseEnter={()=>{if(!disabled)setActiveRating(5)}}
          onMouseLeave={()=>{if(!disabled)setActiveRating(rating)}}
          onClick={()=>onChange(5)}
        >
          <i className={activeRating> 4 ? "fas fa-star" : "far fa-star"}></i>
        </div>
      </div>
    </div>
  )
}

export default StarRating;
