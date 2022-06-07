import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FlightFormComponent } from "./FlightFormComponent"

export const BaseForFlightTabComponent = () => {
  return (
    <Card xs={12}>
      <CardContent>
        <FlightFormComponent />
      </CardContent>
    </Card>
  );
}
