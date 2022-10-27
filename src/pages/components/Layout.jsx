import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// import { HeaderComponent } from "./AppHeader/HeaderComponent"
import { HeaderComponent } from "./AppHeader/HeaderComponentNew"

// import { BottomNavigationComponent } from "./AppFooter/FooterComponent"
import { BottomNavigationComponent } from "./AppFooter/FooterComponentNew"

import useAuth from "../../hooks/useAuth"

const AppStyles = makeStyles((theme) => ({
  appBarSpace: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "100vh",
    width: "100%",
    // overflow: "auto",
    // marginBottom: 70,
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
            <HeaderComponent userLoggedIn={userLoggedIn} />
              <Paper elevation={0} className={classes.content}>
                <div />
                    <Outlet />

                  { userLoggedIn && (
                    <BottomNavigationComponent />
                  )}
              </Paper>
        </div>
    )
}

export default Layout
