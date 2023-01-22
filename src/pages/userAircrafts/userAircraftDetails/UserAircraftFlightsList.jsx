import React from "react"
import Grid from '@mui/material/Grid';
import { UserAircraftFlight } from "./UserAircraftFlightComponent"

export const UserAircraftFlightsListComponent = ({ flights }) => {
  return flights.map(( flight, i ) => (
    <Grid item xs={12} md={4} sx={{ pt:1 }}>
      <UserAircraftFlight key={i} flight={flight} />
    </Grid>
  ))
}
