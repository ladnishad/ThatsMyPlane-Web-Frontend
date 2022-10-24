import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import { UserAircraftTypesFilterChipComponent } from "./UserAircraftTypesFilterChip"
import { CenteredTextComponent } from "../components/CenteredTextComponent"
import { UserFlightsListComponent } from "./UserFlightsList"

export const BaseForUserAircraftsComponent = () => {
  const [aircraftTypesByFilters, setAircraftTypesByFilters] = useState([])
  const [UserFlightsData, setUserFlightsData] = useState([])
  const [flightsToShow, setFlightsToShow] = useState([])

  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getUserAircrafts = async() => {
      try{
        const reqBody = {
          userId: auth?.userId
        }

        const UserAircraftsReq = await axiosPrivate({
          url: "/user/aircrafts",
          method: "post",
          data: reqBody
        })

        setUserFlightsData(UserAircraftsReq.data)
        console.log(UserAircraftsReq.data);
        setAircraftTypesByFilters(UserAircraftsReq.data)
      } catch(e){
        console.log(e);
      }
    }

    getUserAircrafts()
  }, [])

  useEffect(() => {
    let processedFlights = []

    aircraftTypesByFilters.forEach(({ flights }) => {
      processedFlights = [...processedFlights, ...flights]
    })

    setFlightsToShow(processedFlights)
  }, [aircraftTypesByFilters])

  return(
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
          { UserFlightsData.map((UserFlight) => <UserAircraftTypesFilterChipComponent aircraftType={UserFlight} aircraftTypesByFilters={aircraftTypesByFilters} setAircraftTypesByFilters={setAircraftTypesByFilters} />) }
          </Paper>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <UserFlightsListComponent flightsToShow={flightsToShow} />
        </Grid>
      </Grid>
    </Container>
  )
}
