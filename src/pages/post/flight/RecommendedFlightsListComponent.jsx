import React, { useState, useEffect, memo } from "react"
import Grid from '@mui/material/Grid';
// import { RecommendedFlightCard } from "./RecommendedFlightCardComponent"
import { RecommendedFlightCard } from "./RecommendedFlightCardComponentNew"

export const RecommendedFlightsList = memo(({ setOpenConfirmAddFlightDialog, flights, selectedFlight, setSelectedFlight }) => {
    return flights.map(( flight, i ) => (
      <Grid item xs={12} md={flights?.length > 1 ? 6 : 12} sx={{ pt:1 }}>
        <RecommendedFlightCard identifier={i} setOpenConfirmAddFlightDialog={setOpenConfirmAddFlightDialog} flight={flight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
      </Grid>
    ))
})
