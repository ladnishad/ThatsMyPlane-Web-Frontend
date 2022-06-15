import React, { useState, useEffect, memo } from "react"
import Grid from '@mui/material/Grid';
import { RecommendedFlightCard } from "./RecommendedFlightCardComponent"

export const RecommendedFlightsList = memo(({ flights, selectedFlight, setSelectedFlight }) => {
    return flights.map(( flight, i ) => (
      <Grid item xs={12} sx={{ pt:1 }}>
        <RecommendedFlightCard identifier={i} flight={flight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
      </Grid>
    ))
})
