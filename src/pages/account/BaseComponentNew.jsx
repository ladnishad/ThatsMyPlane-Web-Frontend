import React, { useState, useEffect } from 'react';
import dayjs from "dayjs"
import { useNavigate, Link } from "react-router-dom"
import Container from '@mui/material/Container';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet, { sheetClasses } from '@mui/joy/Sheet';
import Switch, { switchClasses } from '@mui/joy/Switch';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import Flight from '@mui/icons-material/Flight';
import KeyIcon from '@mui/icons-material/Key';
import SecurityIcon from '@mui/icons-material/Security';
import Podcasts from '@mui/icons-material/Podcasts';
import LogoutIcon from '@mui/icons-material/Logout';
import Skeleton from '@mui/material/Skeleton';

import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useLogout from "../../hooks/useLogout"

export const BaseForAccountPage = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()
  const logout = useLogout()

  const signout = async() => {
    await logout()
    navigate('/login')
  }

  const [dataLoading, setDataLoading] = useState(true)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserProfile = async() => {
      try{
        setDataLoading(true)
        const UserProfile = await axiosPrivate({
          url:"/account",
          method: 'get'
        })

        setUserData(UserProfile.data)
        setDataLoading(false)
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
    <Container maxWidth="md">
      <Sheet variant="plain" sx={{ width: "100%", p: 2, borderRadius: 'sm' }}>
        <List
          aria-labelledby="ios-example-demo"
          sx={(theme) => ({
            '& ul': {
              '--List-gap': '0px',
              bgcolor: 'background.surface',
              '& > li:first-child > [role="button"]': {
                borderTopRightRadius: 'var(--List-radius)',
                borderTopLeftRadius: 'var(--List-radius)',
              },
              '& > li:last-child > [role="button"]': {
                borderBottomRightRadius: 'var(--List-radius)',
                borderBottomLeftRadius: 'var(--List-radius)',
              },
            },
            '--List-radius': '8px',
            '--List-gap': '1rem',
            '--List-divider-gap': '0px',
            '--List-item-paddingY': '0.5rem',
            // override global variant tokens
            '--joy-palette-neutral-plainHoverBg': 'rgba(0 0 0 / 0.08)',
            '--joy-palette-neutral-plainActiveBg': 'rgba(0 0 0 / 0.12)',
            [theme.getColorSchemeSelector('light')]: {
              '--joy-palette-divider': 'rgba(0 0 0 / 0.08)',
            },
            [theme.getColorSchemeSelector('dark')]: {
              '--joy-palette-neutral-plainHoverBg': 'rgba(255 255 255 / 0.1)',
              '--joy-palette-neutral-plainActiveBg': 'rgba(255 255 255 / 0.16)',
            },
          })}
        >
          <ListItem nested>
            <List aria-label="Personal info" sx={{ '--List-decorator-size': '72px' }}>
              <ListItem>
                {dataLoading ?  (
                  <ListItemDecorator>
                    <Skeleton variant="circular"><Avatar size="lg" /></Skeleton>
                  </ListItemDecorator>
                ) : (
                  <ListItemDecorator>
                    <Avatar alt={`${userData?.firstName} ${userData?.lastName}`} size="lg" sx={{ '--Avatar-size': '60px' }} />
                  </ListItemDecorator>
                  )
                }

                <div>
                  <Typography fontSize="xl">{dataLoading ? <Skeleton width={150} /> : `${userData?.firstName} ${userData?.lastName}`}</Typography>
                  <Typography fontSize="xs" sx={{ ml: 3}}>
                    {dataLoading ? <Skeleton width={200} /> : `Joined on ${dayjs(userData?.signupDate).format("MMMM DD, YYYY")}`}
                  </Typography>
                </div>
              </ListItem>
              <ListDivider inset="startContent" />
              <ListItem>
                <ListItemButton>
                  <ListItemContent>Update profile information</ListItemContent>
                  <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>

          <ListItem nested>
            <List
              aria-label="Network"
              sx={{
                [`& .${sheetClasses.root}`]: {
                  p: 0.5,
                  lineHeight: 0,
                  borderRadius: 'sm',
                },
              }}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <Sheet variant="soft">
                      <KeyIcon />
                    </Sheet>
                  </ListItemDecorator>
                  <ListItemContent>Edit account information</ListItemContent>
                  <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
                </ListItemButton>
              </ListItem>
              <ListDivider inset="startContent" />
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <Sheet variant="soft">
                      <SecurityIcon />
                    </Sheet>
                  </ListItemDecorator>
                  <ListItemContent>Update privacy settings</ListItemContent>
                  <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
                </ListItemButton>
              </ListItem>
              <ListDivider inset="startContent" />
              <ListItem>
                <ListItemButton onClick={signout}>
                  <ListItemDecorator>
                    <Sheet
                      variant="soft"
                    >
                      <LogoutIcon />
                    </Sheet>
                  </ListItemDecorator>
                  <ListItemContent>Logout</ListItemContent>
                  <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested>
            <ListItem
              sx={{
                bgcolor: 'background.surface',
                mb: 1,
                borderRadius: 'var(--List-radius)',
              }}
            >
              <ListItemButton
                aria-describedby="apple-tv-description"
                sx={{ borderRadius: 'var(--List-radius)', bgcolor: 'red', alignItems: "center", justifyContent: 'center' }}
              >
                Delete Account
              </ListItemButton>
            </ListItem>
            <Typography id="apple-tv-description" level="body3" aria-hidden>
              Delete your account information, activity permanently
            </Typography>
          </ListItem>
        </List>
      </Sheet>
    </Container>
  );
}
