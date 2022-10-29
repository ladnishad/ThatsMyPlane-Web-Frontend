import React, { useEffect, useState } from 'react';
import { find, filter } from "lodash"
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export const UserAircraftTypesFilterChipComponent = ({ userFlights}) => {
  return (
    <ListItem key={userFlights._id}>
      <Checkbox
        overlay
        disableIcon
        variant="soft"
        label={userFlights.aircraftType.ICAO}
      />
    </ListItem>
  )
}
