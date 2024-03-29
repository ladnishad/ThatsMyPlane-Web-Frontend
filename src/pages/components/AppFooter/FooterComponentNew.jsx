import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Box from "@mui/joy/Box";
import Paper from "@mui/material/Paper";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Container from "@mui/material/Container";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Badge from "@mui/joy/Badge";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

const BASE_URL =
  process.env.REACT_APP_ENV === "prod"
    ? process.env.REACT_APP_PRODUCTION_API_ENDPOINT
    : process.env.REACT_APP_LOCAL_API_ENDPOINT;

export const BottomNavigationComponent = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const [value, setValue] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.userId) {
      return;
    }
    const socket = io(BASE_URL, {
      query: {
        userId: auth?.userId,
      },
    });

    socket.on("notificationsForUser", (notifications) => {
      console.log("Notifications updated");
      // Update the count on the bell icon
      setNotificationsCount(notifications.length);
    });

    return () => {
      socket.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;

      case "/aircrafts":
        setValue(1);
        break;

      case "/post":
        setValue(2);
        break;

      case "/notifications":
        setValue(3);
        break;

      case "/account":
        setValue(4);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/home");
        break;

      case 1:
        navigate("/aircrafts");
        break;

      case 2:
        navigate("/post");
        break;

      case 3:
        navigate("/notifications");
        break;

      case 4:
        navigate("/account");
        break;
      default:
        navigate("/home");
        break;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: -5,
        left: 0,
        right: 0,
        m: -3,
        mr: 0.1,
        ml: 0.1,
        p: 1,
        py: 5,
        borderRadius: "sm",
        bgcolor: "primary",
      }}
    >
      <Container maxWidth="lg">
        <Tabs
          size="lg"
          aria-label="Bottom Navigation"
          value={value}
          onChange={handleChange}
          sx={(theme) => ({
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            width: "98%",
            mx: "auto",
            boxShadow: theme.shadow.sm,
            "--Tabs-gap": "8px",
            "--joy-shadowChannel": theme.vars.palette["primary"].darkChannel,
            [`& .${tabClasses.root}`]: {
              boxShadow: "none",
              borderRadius: "lg",
              whiteSpace: "nowrap",
              transition: "0.3s",
              fontWeight: "lg",
              flex: 1,
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 0.72,
              },
            },
          })}
        >
          <TabList variant="plain" sx={{ "--List-decorator-size": "28px" }}>
            <Tab
              orientation="vertical"
              {...(value === 0 && { variant: "soft", color: "primary" })}
            >
              <ListItemDecorator>
                <HomeOutlinedIcon />
              </ListItemDecorator>
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 1 && { variant: "soft", color: "primary" })}
            >
              <ListItemDecorator>
                <ConnectingAirportsOutlinedIcon />
              </ListItemDecorator>
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 2 && { variant: "soft", color: "primary" })}
            >
              <ListItemDecorator>
                <AddBoxOutlinedIcon />
              </ListItemDecorator>
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 3 && { variant: "soft", color: "primary" })}
            >
              <ListItemDecorator>
                <Badge badgeContent={notificationsCount}>
                  <NotificationsOutlinedIcon />
                </Badge>
              </ListItemDecorator>
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 4 && { variant: "soft", color: "primary" })}
            >
              <ListItemDecorator>
                <PersonOutlineOutlinedIcon />
              </ListItemDecorator>
            </Tab>
          </TabList>
        </Tabs>
      </Container>
    </Box>
  );
};
