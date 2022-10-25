import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/joy/Box';
import { Link as ReactRouterLink, useNavigate, useLocation } from 'react-router-dom';

import { AlertFeedbackComponent } from "../components/AlertFeedbackComponent"
import axios from "../../api/axios"
import useAuth from "../../hooks/useAuth"
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

export const SignIn = () => {
  const [notify, setNotify] = useState({
    message: "",
    type: "",
    open: false
  })

  const { setAuth, persist, setPersist } = useAuth()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try{
      const email = data.get('email')
      const password = data.get('password')
      const reqBody = await JSON.stringify({ email, password })

      const loginResponse = await axios({
        url: '/login',
        method: 'post',
        data: reqBody,
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true
      })

      const accessToken = loginResponse?.data?.accessToken;
      const userId = loginResponse?.data?.userId;
      setAuth({ userId, accessToken });
      navigate(from, { replace: true });
    } catch(e){
      if(e?.response?.data?.message){
        setNotify({
          message: e.response.data.message,
          type: "error",
          open: true
        })
      }
      else{
        setNotify({
          message: "Something went wrong",
          type: "error",
          open: true
        })
      }
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])

  return (
    <CssVarsProvider theme={theme}>
      <Sheet
        sx={{
          width: 350,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body2">Sign in to continue.</Typography>
      </div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 1
        }}>
        <TextField
          // html input attribute
          name="email"
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          required
          fullWidth
          sx={{
            mb: 3
          }}
          label="Email"
          />
          <TextField
          name="password"
          type="password"
          required
          fullWidth
          placeholder="password"
          label="Password"
          id="password"
          sx={{
            mb: 3
          }}
          />
          <FormControlLabel
            control={<Checkbox value={persist} color="primary" onChange={togglePersist} checked={persist} />}
            label="Remember This Device"
          />
          <Button sx={{ mt: 1, mb: 1 /* margin top */ }} type="submit" fullWidth>
            Sign in
          </Button>
          <Typography
            endDecorator={<Link href="/signup">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don't have an account?
          </Typography>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
        <AlertFeedbackComponent alert={notify} setAlert={setNotify} />
      </Sheet>
    </CssVarsProvider>
  )
}
