import React, { useEffect, useState } from 'react';
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

import useAxiosPrivate from "../../hooks/useAxiosPrivate"

dayjs.extend(relativeTime)

export const UserFlightCardComponent = ({ flight }) => {
  const axiosPrivate = useAxiosPrivate()
  const [aircraftImages, setAircraftImages] = useState([])

  useEffect(() => {
    const getAircraftImages = async() => {
      try{
        const reqBody = {
          aircraftRegistration: flight.aircraft.registrationNum
        }

        const AircraftImagesReq = await axiosPrivate({
          url: "/aircraft/images",
          method: 'post',
          data: reqBody
        })

        setAircraftImages(AircraftImagesReq.data)
      } catch(e){
        console.log(e);
      }
    }

    getAircraftImages()
  }, [flight])

  return (
    <Card
      sx={{ height: 400}}
      className="animate__animated animate__fadeIn"
    >
      <CardMedia
        component="img"
        sx={{ height: "40%" }}
        image={aircraftImages.pop()?.aircraftPhotoURL}
        alt={aircraftImages.pop()?.aircraftPhotoTitle}
      />
    <CardContent sx={{ height: "60%" }}>
      <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" color="primary">{`${flight.airline.IATA} ${flight.flight.flightNumber}`}</Typography>
            </Grid>
            <Grid item container direction='row' spacing={1}>
              <Grid item>
                <Chip label={flight.aircraft.registrationNum} color="primary" />
              </Grid>
              <Grid item>
                <Chip label={flight.aircraft.aircraftType.ICAO} color="primary" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
