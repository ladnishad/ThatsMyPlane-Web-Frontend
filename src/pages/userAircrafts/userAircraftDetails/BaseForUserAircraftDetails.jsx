import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import AspectRatio from "@mui/joy/AspectRatio";
import Grid from '@mui/material/Grid';

import { HeaderComponent } from "./UserAircraftDetailsHeaderComponent"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { getProminentColor } from "../../../helpers"

import { UserAircraftFlightsListComponent } from "./UserAircraftFlightsList"

const useStyles = makeStyles((theme) => {
  const { gradientColors } = theme.palette

  let airlinePrimary = theme.palette.primary.main, airlineSecondary, airlineExtra;

  if(gradientColors){
    airlinePrimary = gradientColors?.airlinePrimary
    airlineSecondary = gradientColors?.airlineSecondary
    airlineExtra = gradientColors?.airlineExtra
  }

  console.log(`${airlinePrimary}, ${airlineSecondary}, ${airlineExtra}`);
  let gradient = `linear-gradient(${airlinePrimary}, ${theme.palette.background.default} 50%)`;
  if (airlineSecondary) {
    gradient = `linear-gradient(${airlinePrimary}, ${airlineSecondary} 25%, ${theme.palette.background.default} 50%)`;
  }
  if (airlineExtra) {
    gradient = `linear-gradient(${airlinePrimary}, ${airlineSecondary} 15%, ${airlineExtra} 30%, ${theme.palette.background.default} 50%)`;
  }

  return {
    root: {
      background: gradient,
      width: '100%',
      height: '100%',
    },
    modalHeader: {
      width: '100%',
      height: '40%',
    },
    imageContainer: {
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },

    },
    aspectRatio: {
      borderRadius: 'sm',
      overflow: 'auto',
      marginRight: 5,
      marginLeft: 5,
    },
    image: {
      width: '100%',
    },
    detailsContainer: {
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    registrationNum: {
      color: theme.palette.primary.main,
    },
    model: {
      fontSize: '1.5rem',
    },
  }
});

export const UserAircraftDetailsDrawer = ({ open, setOpen, aircraftToShow }) => {
  const theme = useTheme();

  const [currentTheme, setTheme] = useState(theme);

  const [gradientColors, setGradientColors] = useState({ airlinePrimary: theme.palette.primary.main, airlineSecondary: "#EC833C", airlineExtra: null })

  const classes = useStyles(currentTheme);

  const axiosPrivate = useAxiosPrivate()

  const [aircraftImage, setAircraftImage] = useState([])

  const setGradient = async (aircraftImage) => {
    // const prominentColor = await getProminentColor(aircraftImage?.aircraftPhotoURL)
    //
    // console.log(prominentColor);
    // setGradientColor(prominentColor)
    // return prominentColor
  }

  useEffect(() => {
    const updatedTheme = currentTheme

    updatedTheme.palette.gradientColors = gradientColors
    setTheme(updatedTheme)
  }, [gradientColors])

  useEffect(() => {
    const getAircraftImages = async() => {
      try{
        const reqBody = {
          aircraftRegistration: aircraftToShow?.registrationNum
        }

        const AircraftImagesReq = await axiosPrivate({
          url: "/aircraft/images",
          method: 'post',
          data: reqBody
        })

        const images = AircraftImagesReq.data

        setAircraftImage(images?.pop())
      } catch(e){
        console.log(e);
      }
    }

    getAircraftImages()
  }, [aircraftToShow])

  return (
    <Modal open={open} onClose={() => setOpen(!open)}>
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        layout="fullscreen"
        className={classes.root}
      >
        <ModalClose />
          <HeaderComponent aircraftToShow={aircraftToShow} aircraftImage={aircraftImage} />
          <Container maxWidth="lg">
          <UserAircraftFlightsListComponent flights={aircraftToShow?.flights} />
          </Container>
      </ModalDialog>
    </Modal>
  );
};
