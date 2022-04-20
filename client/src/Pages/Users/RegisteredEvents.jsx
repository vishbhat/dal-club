// @Author: Kishan Thakkar
import { Box, Grid, Select, Typography, MenuItem } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import axios from "../../Assets/config/axiosConfig"
import { toast } from "react-toastify"
import EventBanner from "../../Assets/images/event-banner.jpg";
import PageBanner from "../../Components/Users/PageBanner"
import RegisteredEventCard from "../../Components/Users/Events/RegisteredEventCard"
import { StateContext } from "../../State"

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState(null)
  const [filterType, setFilterType] = useState("Upcoming")

  const { siteAuth } = useContext(StateContext);

  const handleSelect = e => setFilterType(e.target.value)

  useEffect(() => {
    fetchEvents(filterType)
  }, [filterType])

  const fetchEvents = async (filterType) => {
    let events = await axios.post(`/events/bookedEvents/${siteAuth?.userDetails?.userId}`, {
      eventType: filterType
    }).then(res => {
      if(!res.data.success) return []
      let eventList = []
      res.data.events.forEach(ele => {
        let eventIndex = eventList.findIndex(event => event.id === ele.event.id)
        let rowBookings = ele.ticketsBooked
        if(eventIndex > -1) {
          eventList[eventIndex]["totalBookings"] = eventList[eventIndex]["totalBookings"] + rowBookings
          eventList[eventIndex]["bookings"].push({
            bookingId: ele.id, ticketsBooked: rowBookings
          })
        } else {
          eventList.push({
            ...ele.event,
            totalBookings: rowBookings,
            bookings: [{
              bookingId: ele.id, ticketsBooked: rowBookings
            }]
          })
        }
      })
      return eventList
    }).catch(err => {
      toast.error(err?.response?.data?.message || "Something went wrong")
      return []
    })
    setRegisteredEvents(events)
  }

  const unregisterEvent = (bookingId, tickets) => {
    if(!tickets) {
      toast.error("Please select tickets to unregister.")
      return
    }
    axios.post(`/events/bookedEvents/${bookingId}/unregister`, { tickets }).then(res => {
      toast.success("Unregistered from event successfully.")
      fetchEvents()
    }).catch(err => {
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }

  return (
    <>
      <PageBanner title="Registered events" bannerImage={EventBanner} />
      <Box p={4}>
        <Box display="flex" alignItems="center" justifyContent={"space-between"}>
          <Typography fontSize="1.2rem" fontWeight="bold">Registered Events</Typography>
          <Select onChange={handleSelect} value={filterType} size="small">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Past">Past</MenuItem>
          </Select>
        </Box>
        <Grid container mb={3} mt={1}>
          {registeredEvents ? registeredEvents.length > 0 ? registeredEvents.map(
            ({ id, name, coverImage, eventDate, totalBookings, bookings }) => (
              <Grid key={`${name}-${id}`} item sm={12} md={6}>
                <RegisteredEventCard
                  id={id}
                  name={name}
                  coverImage={coverImage}
                  eventDate={eventDate}
                  ticketsBooked={totalBookings}
                  bookings={bookings}
                  unregisterEvent={unregisterEvent}
                />
              </Grid>
            )
          ) : "No registered events." : "Fetching events."}
        </Grid>
      </Box>
    </>
  )
}

export default RegisteredEvents