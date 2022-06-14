import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import { RecommendedFlightCard } from "./RecommendedFlightCardComponent"

export const RecommendedFlightsList = ({ flights }) => {
    return flights.map(( flight ) => (
      <Grid item xs={12} sx={{ pt:1 }}>
        <RecommendedFlightCard flight={flight} />
      </Grid>
    ))
}
