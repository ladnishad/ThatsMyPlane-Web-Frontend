import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { UserAircraftCardComponent } from "./UserAircraftCardComponent";

export const UserAircraftsListComponent = ({
  aircraftsToShow,
  openAircraftDetailsDrawer,
  setOpenAircraftDetailsDrawer,
  aircraftToShow,
  setAircraftToShow,
  isDataLoading,
}) => {
  const aircrafts = isDataLoading ? [1, 2, 3, 4, 5, 6] : aircraftsToShow;

  return aircrafts.map((aircraft, i) => (
    <Grid item xs={12} md={4} sx={{ pt: 1 }}>
      <UserAircraftCardComponent
        key={i}
        aircraft={aircraft}
        openAircraftDetailsDrawer={openAircraftDetailsDrawer}
        setOpenAircraftDetailsDrawer={setOpenAircraftDetailsDrawer}
        aircraftToShow={aircraftToShow}
        setAircraftToShow={setAircraftToShow}
        isDataLoading={isDataLoading}
      />
    </Grid>
  ));
};
