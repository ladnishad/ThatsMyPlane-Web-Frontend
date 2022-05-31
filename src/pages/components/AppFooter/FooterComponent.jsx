import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom";

export const BottomNavigationComponent = () => {
  const [value, setValue] = useState('home');

  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch(newValue){
      case "home":
        navigate("/home")
        break

      case "discover":
        navigate("/discover")
        break

      case "post":
        navigate("/post")
        break

      case "notifications":
        navigate("/notifications")
        break

      case "account":
        navigate("/account")
        break
      default:
        navigate("/home")
        break
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Discover"
        value="discover"
        icon={<ExploreIcon />}
      />
      <BottomNavigationAction
        label="Post"
        value="post"
        icon={<AddBoxIcon />}
      />
      <BottomNavigationAction
        label="Notifications"
        value="notifications"
        icon={<NotificationsIcon />}
      />
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountCircleIcon />}
      />
      </BottomNavigation>
    </Paper>
  );
}
