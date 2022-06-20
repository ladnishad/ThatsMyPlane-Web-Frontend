import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import { UserFlightCardComponent } from "./UserFlightCardComponent"

export const UserFlightsListComponent = ({ flightsToShow }) => {
  return flightsToShow.map(( flight, i ) => (
    <Grid item xs={12} md={4} sx={{ pt:1 }}>
      <UserFlightCardComponent key={i} flight={flight} />
    </Grid>
  ))
}
