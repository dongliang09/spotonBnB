import React, { useState, useEffect }  from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllBookings, thunkGetAllBookings } from "../../store/booking";
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

function BookingForm() {
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const allBookings = Object.values(useSelector(state=> state.bookings.allBookings))
  const relatedBooking = allBookings.filter(booking=> Number(booking.spotId) === Number(spotId))
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // startDate and endDate are stored as Moment
  const [focusedInput, setFocusedInput] = useState(null);

  async function submitBooking(e) {
    e.preventDefault()
    let startTime = new Date(startDate.format().substring(0,10))
    let endTime = new Date(endDate.format().substring(0,10))
    console.log(startTime, new Date("2023-05-31"))
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
          startDateId="your_unique_start_date_id"
          endDate={endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate)
            setEndDate(endDate)
          }}
          isDayBlocked={alreadyBooked}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput)=> setFocusedInput(focusedInput)}
          required={true}
        />
        <button className="width80 height25rem color-white bor-rad-5 bg-lgcoral font-weight600">
          Reserve
        </button>
      </form>
    </div>
  )
}

export default BookingForm;
