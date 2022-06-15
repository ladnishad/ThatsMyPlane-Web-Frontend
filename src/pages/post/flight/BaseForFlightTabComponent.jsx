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
import { ConfirmDialogComponent } from "../../components/ConfirmDialogComponent"

export const BaseForFlightTabComponent = () => {
  const [searchByRegistration, setSearchByRegistration] = useState(true)
  const [selectedFlight, setSelectedFlight] = useState({})
  const [openConfirmAddFlightDialog, setOpenConfirmAddFlightDialog] = useState(false)

  const handleAddFlight = () => {
    console.log(`${selectedFlight.aircraftRegistration} will be added`);
    setOpenConfirmAddFlightDialog(false)
  }

  useEffect(() => {
    console.log(selectedFlight);
  }, [selectedFlight])
  // TODO: Remove the sample flights below if any after card ui fixed
  const [recommendedFlights, setRecommendedFlights] = useState({
    isLoading: false,
    data: []
  })

  return (
    <>
    <Grid container direction="column" spacing={1} xs={12}>
        <Grid item xs={12} className="animate__animated animate__fadeIn animate__faster" >
          <Card>
            <CardContent>
              <FlightFormComponent setRecommendedFlights={setRecommendedFlights} searchByRegistration={searchByRegistration} setSearchByRegistration={setSearchByRegistration} selectedFlight={selectedFlight} />
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
              <RecommendedFlightsList setOpenConfirmAddFlightDialog={setOpenConfirmAddFlightDialog} flights={recommendedFlights.data} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
            </Grid>
          ) :
          (
            <Grid item sx={{ mt: 4}} className="animate__animated animate__fadeIn">
              <CenteredTextComponent text="No flights to show" variant="subtitle1" />
            </Grid>
          )
        }
      </Grid>
      <ConfirmDialogComponent open={openConfirmAddFlightDialog} setOpen={setOpenConfirmAddFlightDialog} title="Confirm add aircraft" message={`Are you sure you want to add ${selectedFlight.aircraftRegistration} to your collection?`} handleConfirm={handleAddFlight}/>
      </>
  );
}
