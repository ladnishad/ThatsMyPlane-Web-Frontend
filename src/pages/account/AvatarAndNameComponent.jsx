import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const AvatarComponent = ({ firstName, lastName }) => {
  if(!firstName && !lastName){
    return (
      <Skeleton variant="circular" width={150} height={150} />
    )
  }
  return(
    <Avatar
      alt={`${firstName} ${lastName}`}
      sx={{ width: 150, height: 150, marginTop: "5px" }}
    />
  )
}

const NameComponent = ({ firstName, lastName }) => {
  if(!firstName && !lastName){
    return (
      <Skeleton variant="text" />
    )
  }
  return(
    <Typography variant="h4" align="center">
      { `${firstName} ${lastName}` }
    </Typography>
  )
}

export const AvatarAndNameComponent = ({ firstName, lastName }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <AvatarComponent firstName={firstName} lastName={lastName} />
      </Grid>

      <Grid item>
        <NameComponent firstName={firstName} lastName={lastName} />
      </Grid>
    </Grid>
  )
}
