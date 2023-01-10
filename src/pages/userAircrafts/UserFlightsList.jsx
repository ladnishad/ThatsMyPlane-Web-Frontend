import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import { UserFlightCardComponent } from "./UserFlightCardComponent"

export const UserFlightsListComponent = ({ aircraftsToShow, openFlightDetailsDrawer, setFlightDetailsDrawer, aircraftToShow, setAircraftToShow }) => {
  return aircraftsToShow.map(( aircraft, i ) => (
    <Grid item xs={12} md={4} sx={{ pt:1 }}>
      <UserFlightCardComponent key={i} aircraft={aircraft} openFlightDetailsDrawer={openFlightDetailsDrawer} setFlightDetailsDrawer={setFlightDetailsDrawer} aircraftToShow={aircraftToShow} setAircraftToShow={setAircraftToShow} />
    </Grid>
  ))
}
