import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { makeStyles } from '@mui/styles';

import { HeaderComponent } from "./AppHeader/HeaderComponent"
import { BottomNavigationComponent } from "./AppFooter/FooterComponent"

import useAuth from "../../hooks/useAuth"

const AppStyles = makeStyles((theme) => ({
  appBarSpace: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height: "80vh",
    overflow: "auto",
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
            <main className={classes.content}>
              <div className={classes.appBarSpace} />
              <Outlet />
              { userLoggedIn && (
                <BottomNavigationComponent />
              )}

            </main>
        </div>
    )
}

export default Layout
