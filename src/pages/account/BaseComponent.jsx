import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";

import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import { AvatarAndNameComponent } from "./AvatarAndNameComponent"
import { AccountSettingsListComponent } from "./AccountSettingsListComponent"

export const BaseForAccountPage = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserProfile = async() => {
      try{
        const UserProfile = await axiosPrivate({
          url:"/account",
          method: 'get'
        })

        setUserData(UserProfile.data)
        return UserProfile.data
      } catch(e){
        console.log(e);
      }
    }
    if(auth.userId){
      getUserProfile()
    }
  }, [auth])

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <AvatarAndNameComponent firstName={userData.firstName} lastName={userData.lastName} />
      </Grid>

      <Grid item>
        <AccountSettingsListComponent />
      </Grid>
    </Grid>
  )
}
