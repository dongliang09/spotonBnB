import React from "react";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from "./UpdateBookingModal";
import DeleteBookingModal from "./DeleteBookingModal";

function BookingCard({booking, bookingPeriod}) {

  //bookingPeriod is only for future bookings

  return (
    <div className="flx mrg15 gap10p">
      <div className="width300p height200p">
        <Link to={`/spots/${booking.spotId}`}>
          <img src={booking.Spot.previewImage}
            className="width100 height-max-100 obj-fit-cover bor-rad-15"/>
        </Link>
      </div>
      <div className="flx-col gap10p pad25">
        <div className="font115 ">
          <Link to={`/spots/${booking.id}`} className="txt-decor-none color-black">
            <strong >{booking.Spot.name}</strong>
          </Link>
        </div>
        <div className="color-gray">{
          new Date(booking.startDate).toLocaleDateString('en-us',
            { year:"numeric", month:"short", day:"numeric"})} - {
          new Date(booking.endDate).toLocaleDateString('en-us',
            { year:"numeric", month:"short", day:"numeric"})}
        </div>
        <div className="color-gray">
          {booking.Spot.address} {booking.Spot.city +", "+ booking.Spot.state+", "+booking.Spot.country}
        </div>

        { bookingPeriod ==="future" &&<div>
          <OpenModalButton
            buttonText="Update"
            buttonStyle="bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600 mrg-r-5"
            modalComponent={<UpdateBookingModal booking={booking} />}
          />
          <OpenModalButton
            buttonText="Delete"
            buttonStyle="bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600"
            modalComponent={<DeleteBookingModal bookingId={booking.id}/>}
          />
        </div>}
      </div>
    </div>
  )
}

export default BookingCard
