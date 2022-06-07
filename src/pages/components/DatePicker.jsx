import * as React from 'react';
import dayjs from "dayjs"
import TextField from '@mui/material/TextField';
import { AdapterDayjs  } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export const DatePickerComponent = ({ fromPage, date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Flight Date"
        id={`flights-date-picker-${fromPage}-page`}
        name={`flights-date-picker-${fromPage}-page`}
        value={date}
        onChange={(newDate) => {
          setDate(dayjs(newDate).valueOf());
        }}
        renderInput={(params) => <TextField {...params} id={`flights-date-picker-text-${fromPage}-page`} name={`flights-date-picker-text-${fromPage}-page`} style={{ width: "100%" }} />}
      />
    </LocalizationProvider>
  );
}
