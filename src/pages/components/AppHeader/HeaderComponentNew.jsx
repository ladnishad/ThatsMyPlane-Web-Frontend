import React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/material/Typography';
import { DarkModeToggle } from "../DarkModeToggle"

import useLogout from "../../../hooks/useLogout"

export const HeaderComponent = ({ userLoggedIn }) => {
  const { mode, setMode } = useColorScheme();

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
          borderBottom: '0.5px solid',
          borderColor: 'primary.main',
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
      </Box>
    </Box>
  )
}
