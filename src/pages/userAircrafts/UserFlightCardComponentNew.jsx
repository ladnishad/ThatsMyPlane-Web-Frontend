import React, { useEffect, useState } from 'react';
import { startCase } from "lodash"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import Grid from '@mui/material/Grid';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import useAxiosPrivate from "../../hooks/useAxiosPrivate"

dayjs.extend(relativeTime)

export const UserFlightCardComponent = ({ aircraft }) => {
  const axiosPrivate = useAxiosPrivate()
  const [aircraftImages, setAircraftImages] = useState([])

  useEffect(() => {
    const getAircraftImages = async() => {
      try{
        const reqBody = {
          aircraftRegistration: aircraft.registrationNum
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
  }, [aircraft])

  return (
    <Card sx={{ height: "280px" }} className="animate__animated animate__fadeIn">
      <CardCover>
        <img
          src={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=320`}
          srcSet={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=320&dpr=2 2x`}
          loading="lazy"
          alt={aircraftImages.pop()?.aircraftPhotoTitle}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {aircraft.registrationNum}
        </Typography>
        <Typography
          textColor="neutral.300"
        >
          {startCase(aircraft.airline.name.toLowerCase())}
        </Typography>
      </CardContent>
    </Card>
  )
}
