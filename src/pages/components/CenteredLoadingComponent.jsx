import React from "react";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

export const CenteredLoadingComponent=()=>{
  return(
		<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <CircularProgress />
      </Grid>
	)
}
