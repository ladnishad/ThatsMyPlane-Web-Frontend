import React from "react";
import dayjs from "dayjs"
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired
};

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "primary",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)"
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  "& .MuiSlider-track": {
    height: 3
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3
  }
}));

const CustomThumbComponent = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <FlightIcon sx={{ transform: "rotate(90deg)" }} />
    </SliderThumb>
  );
}

CustomThumbComponent.propTypes = {
  children: PropTypes.node
};

const MarkComponent = ({ action="takeOff", airport }) => {
  return (
    <Grid container direction="column" spacing={1} sx={{ width: 100 }}>
      <Grid item>
        {
          action==="takeOff" ? (
            <FlightTakeoffIcon />
          ) : (
            <FlightLandIcon />
          )
        }
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{airport}</Typography>
      </Grid>
    </Grid>
  )
}
export const SliderWithCustomIcon = ({ value=0, originICAO, scheduledOut, destinationICAO, scheduledIn }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
        <MarkComponent action="takeOff" airport={originICAO} />
        <CustomSlider
          components={{ Thumb: CustomThumbComponent }}
          defaultValue={value}
          sx={{ minWidth: "80%" }}
          step={null}
          disabled
        />
        <MarkComponent action="landing" airport={destinationICAO} />
      </Stack>
    </Box>
  );
}
