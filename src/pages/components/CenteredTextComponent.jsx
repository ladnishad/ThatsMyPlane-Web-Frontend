import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const CenteredTextComponent=({ text, variant="h4" })=>{
  return(
		<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography variant={variant} align="center">
          { text }
        </Typography>
      </Grid>
	)
}
