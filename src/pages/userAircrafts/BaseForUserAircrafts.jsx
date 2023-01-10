import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import List from '@mui/joy/List';

import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import { UserAircraftTypesFilterChipComponent } from "./UserAircraftTypesFilterChipNew"
import { CenteredTextComponent } from "../components/CenteredTextComponent"
import { UserFlightsListComponent } from "./UserFlightsList"
import { UserAircraftDetailsDrawer } from "./userAircraftDetails/BaseForUserAircraftDetails"

export const BaseForUserAircraftsComponent = () => {
  const [aircraftTypesByFilters, setAircraftTypesByFilters] = useState([])
  const [UserFlightsData, setUserFlightsData] = useState([])
  const [flightsToShow, setFlightsToShow] = useState([])

  const [openFlightDetailsDrawer, setFlightDetailsDrawer] = useState(false)
  const [aircraftToShow, setAircraftToShow] = useState(null)

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
      } catch(e){
        console.log(e);
      }
    }

    getUserAircrafts()
  }, [])

  return(
    <>
    <Container maxWidth="lg">
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2} xs={12}>
          <UserFlightsListComponent
            aircraftsToShow={UserFlightsData}
            openFlightDetailsDrawer={openFlightDetailsDrawer}
            setFlightDetailsDrawer={setFlightDetailsDrawer}
            aircraftToShow={aircraftToShow}
            setAircraftToShow={setAircraftToShow}
          />
        </Grid>
      </Grid>
    </Container>
    {
      openFlightDetailsDrawer && (
        <UserAircraftDetailsDrawer open={openFlightDetailsDrawer} setOpen={setFlightDetailsDrawer} aircraftToShow={aircraftToShow} />
      )
    }
    </>
  )
}
