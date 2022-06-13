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
import useAuth from "../../../hooks/useAuth"
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

export const AirlineSelect = ({ value, setValue }) => {
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
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue)
      }}
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

export const AircraftRegistrationEntry = ({ required=false }) => {
    return (
      <TextField style={{ width: "100%"}} required={required} id="aircraft-registration" name="aircraft-registration" label="Aircraft Registration" />
    )
}

export const FlightNumberEntry = ({ required=false }) => {
  return (
      <TextField style={{ width: "100%"}} requried={required} id="flight-number" name="flight-number" label="Flight Number" />
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

export const AircraftTypeSelect = ({ value, setValue }) => {
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
      value={value}
      disablePortal
      onChange={(e, newValue) => {
        setValue(newValue)
      }}
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

export const AirportsSelect = ({ airportType, value, setValue }) => {
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
      value={value}
      options={airports}
      onChange={(e, newValue) => {
        setValue(newValue)
      }}
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

export const FlightFormComponent = ({ setRecommendedFlights }) => {
  const [date, setDate] = useState(dayjs().valueOf())
  const [expanded, setExpanded] = useState(false);
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const [airlineSelect, setAirlineSelect] = useState(null)
  const [arrivalAirportSelect, setArrivalAirportSelect] = useState(null)
  const [departureAirportSelect, setDepartureAirportSelect] = useState(null)
  const [aircraftTypeSelect, setAircraftTypeSelect] = useState(null)

  const [searchByRegistration, setSearchByRegistration] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async(event) => {
    event.preventDefault()

    const dataFromForm = new FormData(event.currentTarget)
    const aircraftRegistration = dataFromForm.get("aircraft-registration")
    const flightNumber = dataFromForm.get("flight-number")

    if(searchByRegistration){
      if(date !== null && flightNumber !== null && airlineSelect !== null && aircraftTypeSelect !== null && departureAirportSelect !== null && arrivalAirportSelect !== null){
        console.log(`No need to call api. All fields present`);
        const reqBody = {
          userId: auth.userId,
          flightInformation: {
            airlineIATA: airlineSelect.IATA,
            airlineICAO: airlineSelect.ICAO,
            aircraftRegistration,
            aircraftType: aircraftTypeSelect.ICAO,
            originICAO: departureAirportSelect.ICAO,
            destinationICAO: arrivalAirportSelect.ICAO,
            scheduledOut: date,
            flightNumber
          }
        }

        try{
          const SavedFlight = await axiosPrivate({
            url: "/flight/add",
            method: "post",
            data: reqBody
          })

          console.log("Successful");
        } catch(e){
          console.log(e);
        }
      }
      else{
        console.log("Call search by registration api");
        try{
          const SearchByRegistrationReq = await axiosPrivate({
            url: "/search/flights/registration",
            method: "post",
            data: {
              registrationNumber: aircraftRegistration,
              flightDate: date
            }
          })

          console.log(SearchByRegistrationReq.data);
          setRecommendedFlights(SearchByRegistrationReq.data)
        }

        catch(e){
          console.log(e);
        }
      }
    }
    else{
      if(date !== null && aircraftRegistration !== null && airlineSelect !== null && aircraftTypeSelect !== null && departureAirportSelect !== null && arrivalAirportSelect !== null){
        console.log(`No need to call api. All fields present`);
      }
      else{
        console.log("Call search by flight number api");
      }
    }
    console.log(date);
    console.log(dataFromForm.get("aircraft-registration"));
    console.log(dataFromForm.get("flight-number"));
    console.log(airlineSelect);
    console.log(aircraftTypeSelect);
    console.log(departureAirportSelect);
    console.log(arrivalAirportSelect);
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
                <AircraftRegistrationEntry required />
              ) : (
                <FlightNumberEntry required />
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
                <AirlineSelect value={airlineSelect} setValue={setAirlineSelect} />
              </Grid>

              <Grid item xs={12} md={4}>
                <AircraftTypeSelect value={aircraftTypeSelect} setValue={setAircraftTypeSelect} />
              </Grid>

              <Grid item xs={6}>
                <AirportsSelect airportType="departure" value={departureAirportSelect} setValue={setDepartureAirportSelect} />
              </Grid>

              <Grid item xs={6}>
                <AirportsSelect airportType="arrival" value={arrivalAirportSelect} setValue={setArrivalAirportSelect} />
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
