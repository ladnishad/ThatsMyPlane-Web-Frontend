import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { HeaderComponent } from "./AppHeader/HeaderComponent"
import { BottomNavigationComponent } from "./AppFooter/FooterComponent"

import useAuth from "../../hooks/useAuth"

const AppStyles = makeStyles((theme) => ({
  appBarSpace: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHheight: "100vh",
    overflow: "auto",
    marginBottom: 70
  },
}))

const Layout = () => {
  const classes = AppStyles();
  const { auth } = useAuth()

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    if(auth?.userId && auth?.accessToken){
      setUserLoggedIn(true)
    }
    else{
      setUserLoggedIn(false)
    }
  }, [auth])

    return (
        <div className="App">
          <Container fixed>
            <HeaderComponent userLoggedIn={userLoggedIn} />

              <main className={classes.content}>
                <div className={classes.appBarSpace} />
                  <Paper elevation={0}>
                    <Outlet />
                  </Paper>
                { userLoggedIn && (
                  <BottomNavigationComponent />
                )}

              </main>
            </Container>
        </div>
    )
}

export default Layout
