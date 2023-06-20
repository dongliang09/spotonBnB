import React from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

function SingleSpotMap({lat, lng, spotId, city, state, country}) {

  return(
    <div className="font115 mrg-t-b-13" >
      <hr />
      <h2 ><i className="fas fa-home"></i> Where you will be </h2>
      <div className="mrg-t-b-13 pos-rel">
        <span className="mrg-r-5">{city}, {state}, {country}</span>
        <span className="tooltip-parent">
          <i className="fas fa-info-circle"></i>
          <span className="tooltip-children tooltip-children-bottom width300p">
            Please ignore Google Map error, if you can see the location.
          </span>
        </span>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.googleMapsApiKey}
      >
        <GoogleMap id={"singleSpotMap"+spotId}
          mapContainerClassName="width100 height450p"
          center={{lat:Number(lat), lng:Number(lng)}}
          zoom={13}
        >
          <Marker
            position={{lat:Number(lat), lng:Number(lng)}}
            icon={{
              path: 'M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z',
              // path copied from fontAwesome SVG
              fillColor: 'lightcoral',
              fillOpacity: 1,
              strokeColor: '',
              strokeWeight: 0,
              scale: 0.08
            }}
          />
        </GoogleMap>
      </LoadScript>

    </div>
  )
}


export default SingleSpotMap;
