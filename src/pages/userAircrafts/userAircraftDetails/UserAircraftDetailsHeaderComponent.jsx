import { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/joy/Typography';
import AspectRatio from "@mui/joy/AspectRatio";

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    width: '100%',
    height: '40%',
  },
  image: {
    width: '100%',
    objectFit: "contain"
  },
  registrationNum: {
    color: theme.palette.primary.main,
  },
  model: {
    fontSize: '1.5rem',
  },
}));

export const HeaderComponent = ({ aircraftToShow, aircraftImage }) => {
  const classes = useStyles();

  return (
    <div className={classes.modalHeader}>
      <Container maxWidth="lg">
        <Grid container sx={{ flexDirection: { xs: "column", md: "row"} }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              level="display2"
              className={classes.registrationNum}
            >
              {aircraftToShow?.registrationNum}
            </Typography>
            <Typography level="h6" className={classes.model}>
              {aircraftToShow?.aircraftType?.model}
            </Typography>
            <Typography level="body2">
              {aircraftToShow?.airline?.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <AspectRatio
              minHeight={120}
              maxHeight={200}
              sx={{
                borderRadius: 'sm',
                overflow: 'auto',
                marginRight: 5,
                marginLeft: 5,
              }}
            >
              <img
                src={`${aircraftImage?.aircraftPhotoURL}?auto=format&fit=crop&w=800`}
                srcSet={`${aircraftImage?.aircraftPhotoURL}?auto=format&fit=crop&w=800&dpr=2 2x`}
                alt={aircraftImage?.aircraftPhotoTitle}
                className={classes.image}
              />
            </AspectRatio>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
