import React, { useEffect, useState } from "react";
import { startCase } from "lodash";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CircularProgress from "@mui/joy/CircularProgress";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

dayjs.extend(relativeTime);

export const UserAircraftCardComponent = ({
  aircraft,
  setOpenAircraftDetailsDrawer,
  setAircraftToShow,
  isDataLoading,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [aircraftImages, setAircraftImages] = useState([]);
  const [cardClicked, setCardClicked] = useState(false);

  useEffect(() => {
    if (cardClicked) {
      setAircraftToShow(aircraft);
      setOpenAircraftDetailsDrawer(true);
    } else {
      setOpenAircraftDetailsDrawer(false);
      setAircraftToShow(null);
    }
  }, [cardClicked]);

  return (
    <Card
      sx={{ height: "280px", cursor: "pointer" }}
      className="animate__animated animate__fadeIn"
      onClick={() => {
        if (!isDataLoading) {
          setCardClicked(!cardClicked);
        }
      }}
    >
      <CardCover>
        {isDataLoading ? (
          <Skeleton variant="rectangular" />
        ) : (
          <img
            src={`${
              aircraft?.aircraftImages?.pop()?.url
            }?auto=format&fit=crop&w=320`}
            srcSet={`${
              aircraft?.aircraftImages?.pop()?.url
            }?auto=format&fit=crop&w=320&dpr=2 2x`}
            loading="lazy"
            alt={aircraft?.aircraftImages?.pop()?.caption}
          />
        )}
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography
          level="h2"
          fontSize="lg"
          fontWeight="lg"
          align="left"
          textColor="#fff"
          mb={1}
        >
          {isDataLoading ? <Skeleton /> : aircraft.registrationNum}
        </Typography>
        <Typography align="left" textColor="neutral.300">
          {isDataLoading ? (
            <Skeleton />
          ) : (
            startCase(aircraft?.airline?.name.toLowerCase())
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
