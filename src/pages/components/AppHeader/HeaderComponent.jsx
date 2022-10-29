import React from 'react';
import { useNavigate, Link } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import { DarkModeToggle } from "../DarkModeToggle"
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import useLogout from "../../../hooks/useLogout"

export const HeaderComponent = ({ userLoggedIn }) => {
  const navigate = useNavigate()
  const logout = useLogout()

  const signout = async() => {
    await logout()
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Typography
          variant="appname"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          ThatsMyPlane
        </Typography>
          <Box sx={{ flexGrow: 1 }} />
          { userLoggedIn && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <DarkModeToggle />
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={signout}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}

          {
            userLoggedIn && (
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <DarkModeToggle />
              </Box>
            )
          }

        </Toolbar>
      </AppBar>
    </Box>
  )
}
