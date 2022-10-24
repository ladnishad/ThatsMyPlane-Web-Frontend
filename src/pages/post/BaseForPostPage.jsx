import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import { PostTabsComponent } from "./PostTabsComponent"

export const BaseForPostPage = () => {
  return (
    <Container maxWidth="lg">
      <PostTabsComponent />
    </Container>
  )
}
