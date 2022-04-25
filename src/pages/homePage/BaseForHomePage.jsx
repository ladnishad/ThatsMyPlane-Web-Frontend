import React, { useState, useEffect } from 'react';
import axios from "axios"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CenteredTextComponent } from "../components/CenteredTextComponent"

const getAircraftsNearUser = async({ long, lat }) => {
    const reqBody = {
      startLongitude: long,
      startLatitude: lat,
    }

    const headers = {
      "Authorization": "", //Add jwt here
    }
    const airports = await axios.get("localhost:5000/airports/nearby", { data: reqBody}, { headers: headers })

    console.log(airports)
}

export const BaseForHomePage = () => {
  const [position, setPosition] = useState({ lat: 0, long: 0})
    useEffect(() => {
      if("geolocation" in  navigator){
        navigator.geolocation.getCurrentPosition(async function(position) {
          setPosition({
            lat: position.coords.latitude,
            long: position.coords.longitude
          })
        })
      }
      else{
        console.log("Not available")
      }
    }, [])

    useEffect(() => {
      getAircraftsNearUser({ long: position.long, lat: position.lat })
    }, [position])

    console.log(position)
    return (
      <CenteredTextComponent text="Home" />
    )
}
