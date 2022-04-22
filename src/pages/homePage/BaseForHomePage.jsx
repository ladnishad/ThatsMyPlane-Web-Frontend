import React, { useState, useEffect } from 'react';
import axios from "axios"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CenteredTextComponent } from "../components/CenteredTextComponent"

export const BaseForHomePage = () => {
    useEffect(() => {
      if("geolocation" in  navigator){
        navigator.geolocation.getCurrentPosition(async function(position) {
            console.log(`Location is ${position.coords.latitude}, ${position.coords.longitude}`)
        })
      }
      else{
        console.log("Not available")
      }
    })
    return (
      <CenteredTextComponent text="Home" />
    )
}
