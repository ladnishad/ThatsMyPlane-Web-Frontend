import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs"

import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import { FlightFormComponent } from "./FlightFormComponent"
import { CenteredLoadingComponent } from "../../components/CenteredLoadingComponent"
import { CenteredTextComponent } from "../../components/CenteredTextComponent"
import { RecommendedFlightsList } from "./RecommendedFlightsListComponent"
import { ConfirmDialogComponent } from "../../components/ConfirmDialogComponent"
import { ConfirmDialogWithMediaComponent } from "./NewConfirmDialogWithMedia"

export const BaseForFlightTabComponent = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const [searchByRegistration, setSearchByRegistration] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState({})
  const [visibility, setVisibility] = useState("Private")
  const [caption, setCaption] = useState("")
  const [openConfirmAddFlightDialog, setOpenConfirmAddFlightDialog] = useState(false)

  const handleAddFlight = async() => {
    const { airlineIATA, airlineICAO, aircraftRegistration, aircraftType, originICAO, destinationICAO, scheduledOut, flightDate, flightNumber } = selectedFlight

    const reqBody = {
      userId: auth?.userId,
      flightInformation: {
        airlineIATA,
        airlineICAO,
        aircraftRegistration,
        aircraftType,
        originICAO,
        destinationICAO,
        scheduledOut: dayjs(scheduledOut).valueOf(),
        flightNumber,
      },
      caption,
      visibility,
      fromApi: true
    }

    // TODO: Send error as response with err codes instead of 200
    try{
      const SavedFlight = await axiosPrivate({
        url: "/flight/add",
        method: "post",
        data: reqBody
      })

      setSelectedFlight({})
      setOpenConfirmAddFlightDialog(false)
    } catch(e){
      console.log(e);
      setOpenConfirmAddFlightDialog(false)
    }
  }

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
              <FlightFormComponent recommendedFlights={recommendedFlights} setRecommendedFlights={setRecommendedFlights} searchByRegistration={searchByRegistration} setSearchByRegistration={setSearchByRegistration} selectedFlight={selectedFlight} />
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
      {
        openConfirmAddFlightDialog && (
            <ConfirmDialogWithMediaComponent open={openConfirmAddFlightDialog} flight={selectedFlight} setOpen={setOpenConfirmAddFlightDialog} title="Confirm" message="Review visibility and add a caption" handleConfirm={handleAddFlight} visibility={visibility} setVisibility={setVisibility} caption={caption} setCaption={setCaption} />
        )
      }
      </>
  );
}
