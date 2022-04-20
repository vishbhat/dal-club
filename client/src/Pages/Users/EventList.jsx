// @Author: Kishan Thakkar
import { useContext, useEffect, useState } from "react"
import { Typography, Box, Grid, TextField } from "@mui/material";
import EventCard from "../../Components/Users/Events/EventCard";
import PageBanner from "../../Components/Users/PageBanner";
import {styled} from '@mui/system'
import { toast } from "react-toastify";
import axios from "../../Assets/config/axiosConfig";
import EventBanner from "../../Assets/images/event-banner.jpg";
import { StateContext } from "../../State";

const CategoryTab = styled('div')(({ theme }) => ({
  padding: "5px",
  margin: "5px",
  marginLeft: "0",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "0.4s",
  color: theme.palette.secondary.main,
  "&.selected": {
    color: "white",
    padding: "8px",
    backgroundColor: theme.palette.primary.main,
  }
}))

let debounceVar

const EventList = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState(null)
  const CategoryList = ["All", "Movies", "Conference", "Drama", "Concert", "Game"];
  const { siteAuth } = useContext(StateContext);

  useEffect(() => {
    handleSearch(searchText)
  }, [activeFilter])

  const handleSearchChange = e => {
    let value = e.target.value
    setSearchText(value)
    if(debounceVar) clearTimeout(debounceVar)
    debounceVar = setTimeout(() => {
      handleSearch(value)
    }, 1000);
  }

  const handleSearch = (searchText) => {
    axios.post("/events", {
      category: activeFilter === "All" ? "" : activeFilter,
      searchText
    }).then(response => {
      setEvents(response.data.success ? response.data.events : [])
    }).catch((err) => {
      setEvents([])
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }

  return (
    <>
      <PageBanner title="Events" bannerImage={EventBanner} />
      <Box px={4} py={2} color="secondary.main">
        <Grid container>
          <Grid xs={12} sm={3} item py={2} px={3}>
            <Typography fontSize={"1.2rem"} mb={1} fontWeight={"bold"}>
              Category
            </Typography>
            <Box>
              {CategoryList.map((ele) => (
                <CategoryTab
                  key={ele}
                  className={`${activeFilter === ele ? "selected" : ""}`}
                  onClick={() => setActiveFilter(ele)}
                >
                  {ele}
                </CategoryTab>
              ))}
            </Box>
          </Grid>
          <Grid xs={12} sm={9} item py={2} px={3}>
            <TextField
              placeholder="Search Events"
              size="small"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              fullWidth
            />
            <Grid container mb={3} mt={1}>
              {events ? events.length > 0 ? events.map(
                ({ id, name, coverImage, eventDate, silverMemberPrice, goldMemberPrice, platinumMemberPrice }) => (
                  <Grid key={id} item sm={6} md={4}>
                    <EventCard
                      id={id}
                      name={name}
                      coverImage={coverImage}
                      eventDate={eventDate}
                      price={siteAuth?.userDetails?.packageType === "Silver" ? silverMemberPrice
                      : siteAuth?.userDetails?.packageType === "Gold" ? goldMemberPrice
                      : siteAuth?.userDetails?.packageType === "Platinum" ? platinumMemberPrice
                      : silverMemberPrice}
                    />
                  </Grid>
                )
              ) : "No results found." : "Fetching events."}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EventList;
