import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/joy/Avatar';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { AlertFeedbackComponent } from "../components/AlertFeedbackComponent"
import axios from "../../api/axios"
import { theme } from "../../themes"

function Copyright(props) {
  return (
    <Typography level="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://thatsmyplane.com/">
        ThatsMyPlane
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignUp = () => {
  const [notify, setNotify] = useState({
    message: "",
    type: "",
    open: false
  })

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try{
      const firstName = data.get('firstName')
      const lastName = data.get('lastName')
      const email = data.get('email')
      const password = data.get('password')

      const reqBody = await JSON.stringify({ firstName, lastName, email, password })

      const SignupResponse = await axios({
        url: '/signup',
        method: 'post',
        data: reqBody,
        headers: { 'Content-Type': 'application/json'}
      })

      setNotify({
        message: "User sign up successful",
        type: "success",
        open: true
      })
    } catch(e){
      setNotify({
        message: e.response.data.message,
        type: "error",
        open: true
      })
    }
  };

  return (
    <CssVarsProvider theme={theme}>
      <Box
        sx={{
          width: 350,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          // borderRadius: 'sm',
          // boxShadow: 'sm',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 1
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                placeholder="John"
                size="lg" variant="soft"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                size="lg" variant="soft"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                placeholder="johndoe@email.com"
                name="email"
                autoComplete="email"
                size="lg" variant="soft"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="password"
                autoComplete="new-password"
                size="lg" variant="soft"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                endDecorator={<Link href="/login">Sign in</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                Already have an account?
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
        <AlertFeedbackComponent alert={notify} setAlert={setNotify} />
      </Box>
    </CssVarsProvider>
  )
}
