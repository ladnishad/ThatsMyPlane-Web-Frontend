import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FlightFormComponent } from "./FlightFormComponent"
import { RecommendedFlightsList } from "./RecommendedFlightsListComponent"

export const BaseForFlightTabComponent = () => {
  const [searchByRegistration, setSearchByRegistration] = useState(true)
  // TODO: Remove the sample flights below after card ui fixed
  const [recommendedFlights, setRecommendedFlights] = useState([
    {
        "flightNumber": "1525",
        "flightDate": 1655172600000,
        "airlineICAO": "AAL",
        "airlineIATA": "AA",
        "aircraftRegistration": "N162UW",
        "aircraftType": "A321",
        "scheduledOut": "2022-06-14T02:10:00Z",
        "scheduledIn": "2022-06-14T03:46:00Z",
        "originICAO": "KDFW",
        "destinationICAO": "KELP",
        "status": "Scheduled",
        "progressPercent": 0
    },
    {
        "flightNumber": "1443",
        "flightDate": 1655158620000,
        "airlineICAO": "AAL",
        "airlineIATA": "AA",
        "aircraftRegistration": "N162UW",
        "aircraftType": "A321",
        "scheduledOut": "2022-06-13T22:17:00Z",
        "scheduledIn": null,
        "originICAO": "KCMH",
        "destinationICAO": "KDFW",
        "status": "Scheduled",
        "progressPercent": 0
    },
    {
        "flightNumber": "2337",
        "flightDate": 1655146740000,
        "airlineICAO": "AAL",
        "airlineIATA": "AA",
        "aircraftRegistration": "N162UW",
        "aircraftType": "A321",
        "scheduledOut": "2022-06-13T18:59:00Z",
        "scheduledIn": "2022-06-13T21:25:00Z",
        "originICAO": "KDFW",
        "destinationICAO": "KCMH",
        "status": "Arrived / Gate Arrival",
        "progressPercent": 100
    },
    {
        "flightNumber": "1221",
        "flightDate": 1655130900000,
        "airlineICAO": "AAL",
        "airlineIATA": "AA",
        "aircraftRegistration": "N162UW",
        "aircraftType": "A321",
        "scheduledOut": "2022-06-13T14:35:00Z",
        "scheduledIn": "2022-06-13T17:55:00Z",
        "originICAO": "KSMF",
        "destinationICAO": "KDFW",
        "status": "Arrived / Gate Arrival",
        "progressPercent": 100
    }
  ])

  useEffect(() => {
    console.log(recommendedFlights);
  }, [recommendedFlights])
  return (
    <Grid container direction="column" spacing={1} xs={12}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FlightFormComponent setRecommendedFlights={setRecommendedFlights} searchByRegistration={searchByRegistration} setSearchByRegistration={setSearchByRegistration} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ height: "100%"}}>
          <RecommendedFlightsList flights={recommendedFlights} />
        </Grid>

      </Grid>
  );
}
