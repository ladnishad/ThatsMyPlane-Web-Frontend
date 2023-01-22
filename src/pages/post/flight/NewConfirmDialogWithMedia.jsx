import React, { useState, useEffect } from 'react';
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import ImageIcon from '@mui/icons-material/Image';
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Add from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

import { VisibilitySelectorComponent } from "../../components/VisibilitySelectorNew"

export const ConfirmDialogWithMediaComponent = ({ open, setOpen, title, message, flight, handleConfirm, visibility, setVisibility, caption, setCaption }) => {
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
  }, [flight, visibility])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        size="md"
        sx={{
          minWidth: "40%",
          borderRadius: "md",
          p: 3,
          boxShadow: "lg"
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs>
            <Typography
              id="basic-modal-dialog-title"
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
            >
              {title}
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              mt={0.5}
              mb={2}
              textColor="text.tertiary"
            >
              {message}
            </Typography>
          </Grid>

          <Grid item>
            <VisibilitySelectorComponent visibility={visibility} setVisibility={setVisibility} />
          </Grid>
        </Grid>

        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            minWidth: 300,
            borderRadius: "sm"
          }}
        >
          <AspectRatio
            sx={{
              flexBasis: "300px",
              borderRadius: "sm",
              overflow: "auto"
            }}
          >
            <img
              src={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=800`}
              srcSet={`${aircraftImages.pop()?.aircraftPhotoURL}?auto=format&fit=crop&w=800&dpr=2 2x`}
              alt={aircraftImages.pop()?.aircraftPhotoTitle}
            />
          </AspectRatio>
          <Box>
            <Grid container spacing={2}>
              <Grid item>
                <Typography fontWeight="md">{flight.aircraftRegistration}</Typography>
              </Grid>

              <Grid item>
                <Chip onClick={function () {}} size="sm" variant="soft">
                  {flight.aircraftType}
                </Chip>
              </Grid>
            </Grid>

            <Typography level="body2">{flight.flightNumber}</Typography>
            <Textarea
              minRows={3}
              variant="outlined"
              // label="flexBasis"
              placeholder="Type something..."
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mx: "auto", width: "100%", mt: 2, mb: 1 }}
            />
          </Box>
        </Sheet>
        <Button loading={false} sx={{ mt: 2 }} onClick={handleConfirm} fullWidth startDecorator={<Add />}>
          Add
        </Button>
      </ModalDialog>
    </Modal>
  );
}
