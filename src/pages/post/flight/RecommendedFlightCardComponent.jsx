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

import { RecommendedFlightCardMedia } from "./RecommendedFlightCardWithMediaComponent"
import { SliderWithCustomIcon } from "../../components/SliderWithCustomIcon"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

dayjs.extend(relativeTime)

export const RecommendedFlightCard = ({ flight }) => {
  const axiosPrivate = useAxiosPrivate()
  const [aircraftImages, setAircraftImages] = useState([])

  useEffect(() => {
    const getAircraftImages = async() => {
      try{
        const reqBody = {
          aircraftRegistration: flight.aircraftRegistration
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
  }, [])

  return (
    <Card
      sx={{ height: 550}}
    >
      <CardMedia
        component="img"
        sx={{ height: "40%" }}
        image={aircraftImages.pop()?.aircraftPhotoURL}
        alt={aircraftImages.pop()?.aircraftPhotoTitle}
      />
      <CardContent sx={{ height: "50%"}}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
          <Grid item container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" color="primary">{`${flight.airlineIATA} ${flight.flightNumber}`}</Typography>
            </Grid>
            <Grid item container direction='row' spacing={1}>
              <Grid item>
                <Chip label={flight.aircraftRegistration} color="primary" />
              </Grid>
              <Grid item>
                <Chip label={flight.aircraftType} color="primary" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline">{`${flight.status} ${flight.progressPercent === 0 ? `in ${dayjs(flight.scheduledOut).fromNow()}`: flight.progressPercent > 0 && flight.progressPercent < 100 ? `in ${dayjs(flight.scheduledIn).fromNow()}` : `${dayjs(flight.scheduledIn).fromNow()}`}`}</Typography>
          </Grid>

          <Grid item xs={12}>
            <SliderWithCustomIcon value={flight.progressPercent} originICAO={flight.originICAO} destinationICAO={flight.destinationICAO} />
          </Grid>

          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <FlightTakeoffIcon />
            </Grid>
            <Grid item>
              <Typography variant="body2">{dayjs(flight.scheduledOut).format("MMMM DD YYYY")}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{`at ${dayjs(flight.scheduledOut).format("HH:mm")}`}</Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <FlightLandIcon />
            </Grid>
            <Grid item>
              <Typography variant="body2">{dayjs(flight.scheduledIn).format("MMMM DD YYYY")}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{`at ${dayjs(flight.scheduledIn).format("HH:mm")}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ height: "10%"}}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
