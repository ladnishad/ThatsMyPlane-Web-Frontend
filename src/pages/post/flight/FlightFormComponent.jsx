import React, { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import dayjs from "dayjs"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { DatePickerComponent } from "../../components/DatePicker"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const AirlineSelect = () => {
  const [airlines, setAirlines] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getAirlines = async() => {
      try {
        const airlinesToSet = await axiosPrivate({
          url: "/airlines",
          method: 'get'
        })
        const airlinesList = airlinesToSet.data

        setAirlines(airlinesList)
        return airlinesList
      } catch(e){
        console.log(e);
      }
    }
    getAirlines()
  }, [])

  return (
    <Autocomplete
      id="airline-select"
      name="airline-select"
      disablePortal
      options={airlines}
      autoHighlight
      getOptionLabel={(airline) => airline.name}
      renderOption={(props, airline) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {airline.name} ({airline.ICAO})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an airline"
          id="airline-select-text"
          name="airline-select-text"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export const AircraftRegistrationEntry = () => {
    return (
      <TextField style={{ width: "100%"}} id="aircraft-registration" name="aircraft-registration" label="Aircraft Registration" />
    )
}

export const FlightNumberEntry = () => {
    return (
      <TextField style={{ width: "100%"}} id="flight-number" name="flight-number" label="Flight Number" />
    )
}

export const SearchByLabel = ({ searchByRegistration, setSearchByRegistration }) => {
  return (
    <Typography variant="caption" display="block" gutterBottom color="primary" style={{ cursor: "pointer" }} onClick={() => setSearchByRegistration(!searchByRegistration)} >
      <SavedSearchIcon />
      {
        ` Search by ${searchByRegistration ? "flight number" : "aircaft registration"} instead`
      }
    </Typography>
  )
}

export const AircraftTypeSelect = () => {
  const [aircraftTypes, setAircraftTypes] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getAircraftTypes = async() => {
      try {
        const aircraftTypesResponse = await axiosPrivate({
          url: "/aircraft/types",
          method: 'get'
        })
        const aircraftTypesList = aircraftTypesResponse.data

        setAircraftTypes(aircraftTypesList)
        return aircraftTypesList
      } catch(e){
        console.log(e);
      }
    }
    getAircraftTypes()
  }, [])

  return (
    <Autocomplete
      id="aircraft-type-select"
      name="aircraft-type-select"
      disablePortal
      options={aircraftTypes}
      autoHighlight
      getOptionLabel={(aircraftType) => aircraftType.model}
      renderOption={(props, aircraftType) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {aircraftType.model} ({aircraftType.ICAO})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an aircraft type"
          id="aircraft-type-select-text"
          name="aircraft-type-select-text"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export const AirportsSelect = ({ airportType }) => {
  const [airports, setAirports] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getAirports = async() => {
      try {
        const airportsResponse = await axiosPrivate({
          url: "/airports",
          method: 'get'
        })
        const airportsList = airportsResponse.data

        setAirports(airportsList)
        return airportsList
      } catch(e){
        console.log(e);
      }
    }
    getAirports()
  }, [])

  return (
    <Autocomplete
      id={`${airportType}-airport-select`}
      name={`${airportType}-airport-select`}
      disablePortal
      options={airports}
      autoHighlight
      getOptionLabel={(airport) => `${airport.name}`}
      renderOption={(props, airport) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Grid container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="subtitle2">{airport.name} ({airport.IATA})</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{airport.city}, {airport.state}, {airport.country}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Choose ${airportType} airport`}
          id={`${airportType}-airport-select-text`}
          name={`${airportType}-airport-select-text`}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export const FlightFormComponent = () => {
  const [date, setDate] = useState(dayjs().valueOf())
  const [expanded, setExpanded] = useState(false);
  const [searchByRegistration, setSearchByRegistration] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async(event) => {
    event.preventDefault()

    const dataFromForm = new FormData(event.currentTarget)

    console.log(dataFromForm.get(date));
    console.log(dataFromForm.get("aircraft-registration"));
    console.log(dataFromForm.get("flight-number"));
    console.log(dataFromForm.get("airline-select-text"));
    console.log(dataFromForm.get("aircraft-type-select-text"));
    console.log(dataFromForm.get("departure-airport-select-text"));
    console.log(dataFromForm.get("arrival-airport-select-text"));
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container direction="column" spacing={1}>
        <Grid item container spacing={1}>
          <Grid item xs={6} md={4}>
            <DatePickerComponent fromPage="addFlight" date={date} setDate={setDate} />
          </Grid>

          <Grid item xs={6} md={8}>
            {
              searchByRegistration ? (
                <AircraftRegistrationEntry />
              ) : (
                <FlightNumberEntry />
              )
            }

          </Grid>
        </Grid>

        <Grid item>
          <SearchByLabel searchByRegistration={searchByRegistration} setSearchByRegistration={setSearchByRegistration} />
        </Grid>
        <Grid item>
          {
            expanded === false && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add flight
              </Button>
            )
          }
        </Grid>
        <Grid item>
          <Divider>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <Tooltip title="Additional information" placement="bottom">
                  <ExpandMoreIcon />
                </Tooltip>
              </ExpandMore>
          </Divider>
        </Grid>

        <Grid item>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                {
                  searchByRegistration ? (
                    <FlightNumberEntry />
                  ) : (
                    <AircraftRegistrationEntry />
                  )
                }
              </Grid>
              <Grid item xs={12} md={4}>
                <AirlineSelect  />
              </Grid>

              <Grid item xs={12} md={4}>
                <AircraftTypeSelect  />
              </Grid>

              <Grid item xs={6}>
                <AirportsSelect airportType="departure"  />
              </Grid>

              <Grid item xs={6}>
                <AirportsSelect airportType="arrival"  />
              </Grid>

              <Grid item xs={12}>
                {
                  expanded && (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add flight
                    </Button>
                  )
                }
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  )
}
