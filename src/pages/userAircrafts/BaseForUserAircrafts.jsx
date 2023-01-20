import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import List from "@mui/joy/List";

import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { UserAircraftTypesFilterChipComponent } from "./UserAircraftTypesFilterChipNew";
import { CenteredTextComponent } from "../components/CenteredTextComponent";
import { UserAircraftsListComponent } from "./UserAircraftsList";
import { UserAircraftDetailsDrawer } from "./userAircraftDetails/BaseForUserAircraftDetails";

export const BaseForUserAircraftsComponent = () => {
  const [UserFlightsData, setUserFlightsData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [openAircraftDetailsDrawer, setOpenAircraftDetailsDrawer] =
    useState(false);

  const [aircraftToShow, setAircraftToShow] = useState(null);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!openAircraftDetailsDrawer) {
      setIsDataLoading(true);
      const getUserAircrafts = async () => {
        try {
          const reqBody = {
            userId: auth?.userId,
          };

          const UserAircraftsReq = await axiosPrivate({
            url: "/user/aircrafts",
            method: "post",
            data: reqBody,
          });

          setUserFlightsData(UserAircraftsReq.data);
          setIsDataLoading(false);
        } catch (e) {
          setIsDataLoading(false);
          console.log(e);
        }
      };

      getUserAircrafts();
    }
  }, [openAircraftDetailsDrawer]);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container direction="column" spacing={2}>
          <Grid item container spacing={2} xs={12}>
            <UserAircraftsListComponent
              aircraftsToShow={UserFlightsData}
              openAircraftDetailsDrawer={openAircraftDetailsDrawer}
              setOpenAircraftDetailsDrawer={setOpenAircraftDetailsDrawer}
              aircraftToShow={aircraftToShow}
              setAircraftToShow={setAircraftToShow}
              isDataLoading={isDataLoading}
            />
          </Grid>
        </Grid>
      </Container>
      {openAircraftDetailsDrawer && (
        <UserAircraftDetailsDrawer
          open={openAircraftDetailsDrawer}
          setOpen={setOpenAircraftDetailsDrawer}
          aircraftToShow={aircraftToShow}
        />
      )}
    </>
  );
};
