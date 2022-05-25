import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { CenteredTextComponent } from "../components/CenteredTextComponent"


export const BaseForHomePage = () => {
  const [position, setPosition] = useState({ lat: null, long: null})
  const axiosPrivate = useAxiosPrivate()
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
      const { lat, long } = position

      const getAircraftsNearUser = async({ lat, long }) => {
        const reqBody = {
          startLongitude: long,
          startLatitude: lat,
        }
        try{
          const airports = await axiosPrivate({
            url: "/airports/nearby",
            method: 'get',
            data: reqBody
          })

          console.log(airports.data)
        } catch(e){
          console.log(e);
        }
      }
      if(lat !== null && long !== null){
        getAircraftsNearUser({ long: position.long, lat: position.lat })
      }
    }, [position])

    console.log(position)
    return (
      <CenteredTextComponent text="Home" />
    )
}
