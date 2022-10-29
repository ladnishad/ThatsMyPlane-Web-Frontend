import React, { useEffect, useState } from 'react';
import { find, filter } from "lodash"
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const UserAircraftTypesFilterChipComponent = ({ aircraftType, aircraftTypesByFilters, setAircraftTypesByFilters }) => {
  const [chipVariant, setChipVariant] = useState("outlined")
  const [filterPresent, setFilterPresent] = useState(true)

  useEffect(() => {
    const aircraftTypeInFilter = find(aircraftTypesByFilters, { _id: aircraftType._id})

    if(aircraftTypeInFilter){
      setFilterPresent(true)
    }
    else{
      setFilterPresent(false)
    }
  }, [aircraftTypesByFilters, aircraftType])

  const handleClick = () => {
      if(filterPresent){
        const updatedFilters = filter(aircraftTypesByFilters, function(filter) {
          if(aircraftType._id !== filter._id){
            return filter
          }
        })

        setAircraftTypesByFilters(updatedFilters)
      }
      else{
        const updatedFilters = [...aircraftTypesByFilters, aircraftType]
        setAircraftTypesByFilters(updatedFilters)
      }
  }

  return (
    <ListItem>
      <Chip label={aircraftType._id} color="primary" variant={filterPresent ? "filled" : "outlined"} onClick={handleClick} />
    </ListItem>
  )
}
