import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const CenteredTextComponent=({ text })=>{
  return(
		<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography variant="h4" align="center">
          { text }
        </Typography>
      </Grid>
	)
}
