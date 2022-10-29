import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Carousel from "react-material-ui-carousel";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

export const RecommendedFlightCardMedia = ({ flight }) => {
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
    <Carousel
      autoPlay={false}
      animation="slide"
      style={{ minWidth: "100%", maxHeight: "100%"}}
      indicatorIconButtonProps={{
        style: {
          padding: "3px",
        },
      }}
    >
      {
        aircraftImages.map(({ aircraftPhotoURL, aircraftPhotoTitle }) => (
          <Box
            component="img"
            src={aircraftPhotoURL}
            alt={aircraftPhotoTitle}
            sx={{ maxHeight: 300 }}
          />
        ))
      }
    </Carousel>
  )

}
