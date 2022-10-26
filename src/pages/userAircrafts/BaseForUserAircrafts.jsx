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
      } catch(e){
        console.log(e);
      }
    }

    getUserAircrafts()
  }, [])

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
            <List
              row
              wrap
              sx={{
                '--List-gap': '8px',
                '--List-item-radius': '20px',
              }}
            >
              { UserFlightsData.map((UserFlight) => <UserAircraftTypesFilterChipComponent userFlights={UserFlight} />) }
            </List>
          </Paper>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <UserFlightsListComponent aircraftsToShow={UserFlightsData} />
        </Grid>
      </Grid>
    </Container>
  )
}
