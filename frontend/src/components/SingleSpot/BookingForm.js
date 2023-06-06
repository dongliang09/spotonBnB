import React, { useState, useEffect }  from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllBookings, thunkCreateBooking } from "../../store/booking";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// react-dates https://github.com/react-dates/react-dates
// demo https://react-dates.github.io/react-dates/?path=/story/daterangepicker-drp--default

// install react-dates need moment js
// here is the reference https://momentjs.com/

// startDate.format() => 2023-05-31T12:00:00-07:00
// we just need to substring from index 0 to index 9
// startDate.format().substring(0,10) => 2023-05-31

function BookingForm({dailyPrice}) {
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const allBookings = Object.values(useSelector(state=> state.bookings.allBookings))
  const relatedBooking = allBookings.filter(booking=> Number(booking.spotId) === Number(spotId))
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // startDate and endDate are stored as Moment
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null)

  const [isGuestExpand, setIsGuestExpand] = useState(false)
  const [adultNum, setAdultNum] = useState(1)
  const [childNum, setChildNum] = useState(0)
  const [infantNum, setInfantNum] = useState(0)

  function calBookingNights (startDate, endDate) {
    if (startDate && endDate) {
      let timeDiff = new Date(endDate.format()).getTime() - new Date(startDate.format()).getTime()
      return (timeDiff / 1000 / 60 / 60 / 24)
    } else {
      return 0
    }
  }

  async function submitBooking(e) {
    e.preventDefault()
    let startTime = startDate.format().substring(0,10)
    let endTime = endDate.format().substring(0,10)
    // console.log(startTime)
    await dispatch(thunkCreateBooking(spotId, {startDate:startTime, endDate:endTime}))
  }

  // this function is used to DateRangePicker's property isDayBlocked
  // to determine if the day is allowed to choose
  function alreadyBooked(momentDate) {
    let isOutsideBookings = true
    let date = new Date(momentDate.format()).getTime()
    for (let i = 0; i < relatedBooking.length; i++) {
      let startDate = new Date(relatedBooking[i].startDate).getTime()
      let endDate = new Date(relatedBooking[i].endDate).getTime() + 24 * 60 * 60 * 1000;
      // 1 day is 24 hours * 60 min * 60 secs * 1000 ms
      if ( startDate <= date && date <= endDate) {
        isOutsideBookings = false
      }
    }
    return !isOutsideBookings
  }

  useEffect(()=>{
    dispatch(thunkGetAllBookings(spotId))
  }, [dispatch])

  return (
    <div>
      <form onSubmit={(e)=>submitBooking(e)}>
        <DateRangePicker
          startDate={startDate}
          startDateId="booking_start_date"
          endDate={endDate}
          endDateId="booking_end_date"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate)
            setEndDate(endDate)
          }}
          isDayBlocked={alreadyBooked}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput)=> setFocusedInput(focusedInput)}
          required={true}
        />
        <div className="pad15 flx-center-space cursor-pointer" onClick={()=>setIsGuestExpand(!isGuestExpand)}>
          <div>
            {adultNum + childNum} Guest {infantNum === 0 ? null : ", "+infantNum + (infantNum===1?" infant":" infants")}
          </div>
          <div>
            { isGuestExpand ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }
          </div>
        </div>

        <div id="bookingGuestNum" className={ (isGuestExpand ? "flx-col pos-abs" : "hidden") + " bg-white gap115rem pad15 boxShadow-0-1-5-1-gray bor-rad-5"}>
          <div className="grid-5-2 ">
            <div className="flx-col">
              <div className="font-weight600">Adults</div>
              <div>Age 13+</div>
            </div>
            <div className="flx-center-space-mid">
              <button type="button" onClick={()=>setAdultNum(adultNum-1)} disabled={adultNum <= 1} className="bor-0p bg-white">
                <i className="fas fa-minus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
              {adultNum}
              <button type="button" onClick={()=>setAdultNum(adultNum+1)} className="bor-0p bg-white">
                <i className="fas fa-plus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
            </div>
          </div>

          <div className="grid-5-2 ">
            <div className="flx-col">
              <div className="font-weight600">Children</div>
              <div>Ages 2-12</div>
            </div>
            <div className="flx-center-space-mid">
              <button type="button" onClick={()=>setChildNum(childNum-1)} disabled={childNum <= 0} className="bor-0p bg-white">
                <i className="fas fa-minus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
              {childNum}
              <button type="button" onClick={()=>setChildNum(childNum+1)} className="bor-0p bg-white">
                <i className="fas fa-plus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
            </div>
          </div>

          <div className="grid-5-2 ">
            <div className="flx-col">
              <div className="font-weight600">Infants</div>
              <div>Under 2</div>
            </div>
            <div className="flx-center-space-mid">
              <button type="button" onClick={()=>setInfantNum(infantNum-1)} disabled={infantNum <= 0} className="bor-0p bg-white">
                <i className="fas fa-minus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
              {infantNum}
              <button type="button" onClick={()=>setInfantNum(infantNum+1)} className="bor-0p bg-white">
                <i className="fas fa-plus bor-1p-sol-gray bor-rad-50per pad5"></i>
              </button>
            </div>
          </div>
        </div>

        <button className="width80 height25rem color-white bor-rad-5 bg-lgcoral font-weight600">
          Reserve
        </button>
      </form>

      {startDate && endDate && <div id="displayBookingInfo" className="flx-col gap10p">
          <p className="txt-center">
            You won't be charged yet
          </p>
          <div className="flx-center-space">
            <div>${dailyPrice} x {calBookingNights(startDate, endDate)} nights</div>
            <div>${dailyPrice * calBookingNights(startDate, endDate).toFixed(2)}</div>
          </div>
          <div  className="flx-center-space">
            <div>Cleaning fee</div>
            <div>$75</div>
          </div>
          <div  className="flx-center-space">
            <div>Service fee</div>
            <div>${(dailyPrice * calBookingNights(startDate, endDate) * 0.14).toFixed(2)}</div>
          </div>
          <hr />
          <div  className="flx-center-space">
            <div className="font-weight600">Total before taxes</div>
            <div>${(dailyPrice * calBookingNights(startDate, endDate) * 1.14 + 75).toFixed(2)}</div>
          </div>
      </div>}
    </div>
  )
}

export default BookingForm;
