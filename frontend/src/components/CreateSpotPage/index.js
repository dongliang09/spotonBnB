import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from '../../store/spot';

function CreateSpotPage() {
  const dispatch = useDispatch();

  // upon successful submit,
  // jump to the spot detail page for new spot

  return (
    <div>
      <h1>Create a new Spot</h1>
      <form onSubmit={()=>console.log("do something on submit")}>

        <button>Create Spot</button>
      </form>

    </div>
  )
}

export default CreateSpotPage;
