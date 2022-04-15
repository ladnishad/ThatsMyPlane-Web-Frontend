import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const CenteredTextComponent=({ text })=>{
  console.log(text)
	return(
		<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h4" color="textSecondary" align="center">
          { text }
        </Typography>
      </Grid>
	)
}
