import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

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
      <Card
      sx={{
        width: "100%",
        height: "20%",
        paddingTop: "10px",
        paddingBottom: "10px"
        // paddingLeft: "10px"
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Grid item sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Write your thoughts"
            id="postText"
            sx={{ width: "85%" }}
            size="small"
          />
        </Grid>
      </Grid>
    </Card>
    )
}
