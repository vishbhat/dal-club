// @Author: Kishan Thakkar
import { Box, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { format, parseISO, isBefore } from "date-fns";
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useState } from "react";

const RegisteredEventCard = ({ id, name="", coverImage, eventDate, ticketsBooked, bookings, unregisterEvent }) => {
  const [ showBookings, setShowBookings ] = useState(false)
  const [ ticketSelection, setTicketSelection ] = useState({})
  
  const toggleSelect = () => setShowBookings(val => !val)
  
  const handleSelect = (e) => {
    setTicketSelection(val => ({ ...val, [e.target.name]: e.target.value }))
  }

  const handleUnregister = e => unregisterEvent(e.target.name, ticketSelection[e.target.name])
  
  return (
    <Box padding={1.25}>
      <Grid
        container
        height="300px"
        sx={{
          transition: "0.2s",
          "&:hover": {
            boxShadow: "0 0 5px -1px",
          }
        }}
        borderRadius={1}
        border={"1px solid lightgray"}
      >
        <Grid item xs={6} lg={6}>
          <Box
            component={"img"}
            sx={{ objectFit: "cover" }}
            src={coverImage || `https://via.placeholder.com/600x400?text=${name.replace(" ", "+")}`}
            alt={name}
            width="100%"
            height="100%"
          />
        </Grid>
        <Grid item xs={6} lg={6} height="100%" overflow={"auto"}>
          <Box p={2.5} position="relative">
            <Box position={"sticky"} top={0} bgcolor="white" zIndex={2}>
              <Typography
                fontSize={"1.2rem"}
                fontWeight={"bold"}
                color="primary.main"
                textOverflow={"ellipsis"}
                overflow="hidden"
                whiteSpace={"nowrap"}
              >
                {name}
              </Typography>
              <Box display={"flex"} alignItems="center" mb={0.5} fontSize={"0.8rem"} color="grey.700">
                <Box color="primary.main"><CalendarTodayRoundedIcon style={{ fontSize: "1.3rem" }} /></Box>
                &nbsp;{eventDate ? format(parseISO(eventDate), "MM-dd-yyyy") : ""}
              </Box>
              <Typography color="secondary.light">
                Booked {ticketsBooked} places.
              </Typography>
            </Box>
            { showBookings && bookings.map(booking => (
              <>
                <FormControl key={`dropdown${id}-${booking.bookingId}`} sx={{ minWidth: 140, marginTop: 1 }} size="small">
                <InputLabel id={`ip-${id}-${booking.bookingId}`}>Select tickets</InputLabel>
                <Select
                  labelId={`ip-${id}-${booking.bookingId}`}
                  label="Select tickets"
                  name={`${booking.bookingId}`}
                  onChange={handleSelect}
                  value={ticketSelection[booking.bookingId] || ''}
                  MenuProps={{ PaperProps: { style: { maxHeight: "175px" } } }}
                >
                  {Array.from({length: booking.ticketsBooked}).map((ele, i) => (
                    <MenuItem key={`seat-${i}-${booking.bookingId}`} value={i+1}>{i+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="text" color="error" name={`${booking.bookingId}`} onClick={handleUnregister}>
                Un-Register
              </Button>
            </>
            ))}
            { isBefore(new Date(), parseISO(eventDate)) && <Button
              variant="contained"
              color="error"
              onClick={toggleSelect}
              sx={{ textTransform: "none", marginTop: 2, transition: "0.2s" }}
            >
              {showBookings ? "Cancel" : "Un-Register"}
            </Button>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisteredEventCard;
