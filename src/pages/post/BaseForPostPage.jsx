import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

// import { PostTabsComponent } from "./PostTabsComponent"

// Joy ui component needs some work on styling and font
import { PostTabsComponent } from "./PostTabsComponentNew"

export const BaseForPostPage = () => {
  return (
    <Container maxWidth="lg">
      <PostTabsComponent />
    </Container>
  )
}
