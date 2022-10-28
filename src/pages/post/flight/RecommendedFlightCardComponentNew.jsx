import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Add from '@mui/icons-material/Add';
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

dayjs.extend(relativeTime)

export const RecommendedFlightCard = ({ identifier, setOpenConfirmAddFlightDialog, flight, selectedFlight, setSelectedFlight }) => {
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
  }, [selectedFlight])

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }} fontWeight="lg" align="left">
        {`${flight.airlineIATA} ${flight.flightNumber}`}
      </Typography>
      <Typography level="body2" align="left">{`${flight.originICAO} to ${flight.destinationICAO}`}</Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        <BookmarkAdd />
      </IconButton>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=286`}
          srcSet={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=286&dpr=2 2x`}
          loading="lazy"
          alt={aircraftImages.pop()?.aircraftPhotoTitle}
        />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography fontSize="lg" fontWeight="lg" align="left">
           {flight.aircraftRegistration}
          </Typography>
          <Typography align="left" level="body3">{`${flight.status} ${flight.progressPercent === 0 ? `in ${dayjs(flight.scheduledOut).fromNow()}`: flight.progressPercent > 0 && flight.progressPercent < 100 ? `in ${dayjs(flight.scheduledIn).fromNow()}` : `${dayjs(flight.scheduledIn).fromNow()}`}`}</Typography>
        </div>
        <Button
          variant="soft"
          size="sm"
          color="primary"
          aria-label="Add Flight"
          sx={{ ml: "auto", fontWeight: 600 }}
          startDecorator={<Add />}
          onClick={() => {
              setSelectedFlight({ identifier, ...flight })
              setOpenConfirmAddFlightDialog(true)
          }}
        >
          Add
        </Button>
      </Box>
    </Card>
  );
}
