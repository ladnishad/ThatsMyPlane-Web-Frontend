import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FlightFormComponent } from "./FlightFormComponent"
import { CenteredLoadingComponent } from "../../components/CenteredLoadingComponent"
import { CenteredTextComponent } from "../../components/CenteredTextComponent"
import { RecommendedFlightsList } from "./RecommendedFlightsListComponent"

export const BaseForFlightTabComponent = () => {
  const [searchByRegistration, setSearchByRegistration] = useState(true)
  // TODO: Remove the sample flights below if any after card ui fixed
  const [recommendedFlights, setRecommendedFlights] = useState({
    isLoading: false,
    data: []
  })

  return (
    <Grid container direction="column" spacing={1} xs={12}>
        <Grid item xs={12} className="animate__animated animate__fadeIn animate__faster" >
          <Card>
            <CardContent>
              <FlightFormComponent setRecommendedFlights={setRecommendedFlights} searchByRegistration={searchByRegistration} setSearchByRegistration={setSearchByRegistration} />
            </CardContent>
          </Card>
        </Grid>

        {
          recommendedFlights.isLoading ? (
            <Grid item sx={{ mt: 4}} >
              <CenteredLoadingComponent />
            </Grid>
          ) :
          recommendedFlights.data.length > 0 ?
          (
            <Grid item xs={12} sx={{ height: "100%"}}>
              <RecommendedFlightsList flights={recommendedFlights.data} />
            </Grid>
          ) :
          (
            <Grid item sx={{ mt: 4}} className="animate__animated animate__fadeIn">
              <CenteredTextComponent text="No flights to show" variant="subtitle1" />
            </Grid>
          )
        }
      </Grid>
  );
}
