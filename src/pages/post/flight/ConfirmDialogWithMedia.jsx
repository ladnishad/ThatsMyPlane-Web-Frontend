import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmDialogWithMediaComponent = ({ open, setOpen, title, message, flight, handleConfirm }) => {
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
  }, [flight])

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={handleClose}
        aria-describedby="confirm-dialog"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            { message }
          </DialogContentText>

          <Card
            sx={{ height: 400, border:"none", boxShadow: "none" }}
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
                <Grid item xs={12}
                  <TextField id="caption-text" label="Caption" variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}
