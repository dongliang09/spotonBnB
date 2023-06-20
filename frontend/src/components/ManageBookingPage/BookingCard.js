import React from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteBookingModal from "./DeleteBookingModal";

function BookingCard({booking, bookingType}) {
  return (
    <div className="flx mrg15 gap10p">
      <div className="width300p height200p">
        <img src={booking.Spot.previewImage}
          className="width100 height-max-100 obj-fit-cover bor-rad-15"/>
      </div>
      <div className="flx-col gap10p pad25">
        <div><strong>{booking.Spot.name}</strong></div>
        <div>{
          new Date(booking.startDate).toLocaleDateString('en-us',
            { year:"numeric", month:"short", day:"numeric"})} - {
          new Date(booking.endDate).toLocaleDateString('en-us',
            { year:"numeric", month:"short", day:"numeric"})}
        </div>
        <div>
          {booking.Spot.address} {booking.Spot.city} {booking.Spot.state} {booking.Spot.country}
        </div>

        { bookingType ==="future" &&<div>
          <button className="bg-white pad5 bor-rad-5 width100p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600 mrg-r-5">
            Update
          </button>
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
