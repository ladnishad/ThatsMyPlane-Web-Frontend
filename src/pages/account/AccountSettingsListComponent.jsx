import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const SettingsOptions = [
  {
    setting: "Edit profile information",
    description: "Edit first name, last name"
  },
  {
    setting: "Edit account information",
    description: "Edit email address, password"
  },
  {
    setting: "Logout",
    description: "Log out of your account"
  },
]

const SettingsListItemComponent = ({ setting, description }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="h6"
            >
              {setting}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
            >
              {description}
            </Typography>
          </>
        }
      />
      </ListItem>
  )
}

export const AccountSettingsListComponent = () => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      { SettingsOptions.map(({ setting, description }) => {
        return (
          <>
            <SettingsListItemComponent setting={setting} description={description} />
            <Divider component="li" />
          </>
        )
      })}
    </List>
  );
}
