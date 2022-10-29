import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import { UserFlightCardComponent } from "./UserFlightCardComponentNew"

export const UserFlightsListComponent = ({ aircraftsToShow }) => {
  return aircraftsToShow.map(( aircraft, i ) => (
    <Grid item xs={12} md={4} sx={{ pt:1 }}>
      <UserFlightCardComponent key={i} aircraft={aircraft} />
    </Grid>
  ))
}
