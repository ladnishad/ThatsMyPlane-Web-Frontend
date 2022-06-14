import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import { RecommendedFlightCard } from "./RecommendedFlightCardComponent"

export const RecommendedFlightsList = ({ flights }) => {
  return (
    <Grid container direction="column" spacing={3} xs={12}>
      {
        flights.map(( flight ) => (
          <Grid item xs={12}>
            <RecommendedFlightCard flight={flight} />
          </Grid>
        ))
      }
    </Grid>
  )
}
