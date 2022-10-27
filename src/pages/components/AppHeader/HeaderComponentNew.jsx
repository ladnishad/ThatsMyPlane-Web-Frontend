import React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { useNavigate, Link } from "react-router-dom"
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import { DarkModeToggle } from "../DarkModeToggle"
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import useLogout from "../../../hooks/useLogout"

export const HeaderComponent = ({ userLoggedIn }) => {
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate()
  const logout = useLogout()

  const signout = async() => {
    await logout()
    navigate('/login')
  }

  return (
    <Box
      component="header"
      className="Header"
      sx={{
          p: 2,
          gap: 2,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gridColumn: '1 / -1',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="appname"
          noWrap
          gutterBottom
          component="div"
          color={mode === "dark" ? "common.white" : "primary.main"}
        >
          ThatsMyPlane
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        {
          userLoggedIn && (
            <DarkModeToggle />
          )
        }
        {
          userLoggedIn && (
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
          )
        }
      </Box>
    </Box>
  )
}
