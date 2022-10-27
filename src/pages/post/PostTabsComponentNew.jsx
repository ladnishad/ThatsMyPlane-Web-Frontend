import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

import { BaseForFlightTabComponent } from "./flight/BaseForFlightTabComponent"
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
       <Box>
         {children}
       </Box>
     )}
   </div>
  )
}

export const PostTabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Tabs
        aria-label="Soft tabs"
        value={value}
        onChange={handleChange}
      >
        <TabList variant="soft" color="neutral">
          <Tab
            variant={value === 0 ? 'solid' : 'plain'}
            color={value === 0 ? 'primary' : 'neutral'}
          >
            Flight
          </Tab>
          <Tab
            variant={value === 1 ? 'solid' : 'plain'}
            color={value === 1 ? 'primary' : 'neutral'}
          >
            Upload
          </Tab>
          <Tab
            variant={value === 2 ? 'solid' : 'plain'}
            color={value === 2 ? 'primary' : 'neutral'}
          >
            Spotting
          </Tab>
        </TabList>
      </Tabs>

      <TabComponent value={value} index={0}>
        <BaseForFlightTabComponent />
      </TabComponent>

      <TabComponent value={value} index={1}>
        <BaseForUploadPostComponent />
      </TabComponent>

      <TabComponent value={value} index={2}>
        <CenteredTextComponent text="Start a plane spotting session" />
      </TabComponent>
    </Box>
  )
}
