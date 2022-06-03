import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { BaseForUploadPostComponent } from "./upload/BaseForUploadPost"
import { CenteredTextComponent } from "../components/CenteredTextComponent"

const TabComponent = ({ children, value, index, ...other }) => {
  return (
    <div
     role="tabpanel"
     hidden={value !== index}
     id={`Post-Tabs-Tabpanel-${index}`}
     aria-labelledby={`Post-Tab-${index}`}
     {...other}
   >
     {value === index && (
       <Box sx={{ p: 3 }}>
         {children}
       </Box>
     )}
   </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `Post-Tab-${index}`,
    'aria-controls': `Post-Tabs-Tabpanel-${index}`,
  };
}

export const PostTabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
        <Tab label="Flight" {...a11yProps(0)} />
        <Tab label="Upload" {...a11yProps(1)} />
        <Tab label="Spotting" {...a11yProps(2)} />
      </Tabs>
      <TabComponent value={value} index={0}>
        <CenteredTextComponent text="Add flights to get memories with the plane" />
      </TabComponent>

      <TabComponent value={value} index={1}>
        <BaseForUploadPostComponent />
      </TabComponent>

      <TabComponent value={value} index={2}>
        <CenteredTextComponent text="Start a plane spotting session" />
      </TabComponent>
    </Box>
  );
}
