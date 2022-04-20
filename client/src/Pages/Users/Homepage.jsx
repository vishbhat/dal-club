// @Author: Kishan Thakkar
import React, { useContext } from "react"
import { Box } from "@mui/material"
import BannerCarousel from "../../Components/Users/Homepage/BannerCarousel"
import EventCarousel from "../../Components/Users/Homepage/EventCarousel"
import InfoSection from "../../Components/Users/Homepage/InfoSection"
import EventBanner from "../../Assets/images/home-event.jpg"
import { StateContext } from "../../State"

const Homepage = () => {
  const { siteAuth } = useContext(StateContext)
  return (
    <div>
      <BannerCarousel />
      <Box width={"70%"} margin="auto" my={"30px !important"}>
        <EventCarousel isLoggedIn={siteAuth?.isLoggedIn} userType={siteAuth?.userDetails?.packageType} />
      </Box>
      <InfoSection isReverse image={EventBanner} title="Socialize with us" description={`
        Take a break from everyday life and socialize with people through club events.
        Participate in events like conference, concerts and game shows hosted by club.
      `} />
      <InfoSection image={EventBanner} title="Merchandise" description={`
        Get ready with club's merchandise products and be a part of community.
        Explore variety of products themed with your favourite club.
      `} />
    </div>
  )
}

export default Homepage