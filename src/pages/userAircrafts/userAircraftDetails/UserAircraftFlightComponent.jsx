import * as React from 'react';
import dayjs from "dayjs"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';

import { startCase } from "lodash"

export const UserAircraftFlight = ( { flight } ) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Typography level="h5" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
        {`Flight to ${startCase(flight?.destinationAirport?.city?.toLowerCase())}`}
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        <Link href="#multiple-actions">{`From ${startCase(flight?.originAirport?.city?.toLowerCase())}`}</Link>
      </Typography>
      <Divider inset="context" />
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          bgcolor: 'background.level1',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          6.3k views
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {`${dayjs(flight?.flightDate).format("MMMM DD, YYYY")}`}
        </Typography>
      </CardOverflow>
    </Card>
  );
}
