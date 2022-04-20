// @Author: Kishan Thakkar
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import EventCard from "../Events/EventCard";
import axios from "../../../Assets/config/axiosConfig";
import { toast } from "react-toastify";

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      className="homepage-slick-arrow"
      color={"secondary.main"}
      style={{ ...style, right: "-30px", fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10095;
    </Box>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      className="homepage-slick-arrow"
      color={"secondary.main"}
      style={{ ...style, left: "-30px", fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10094;
    </Box>
  );
};

const EventCarousel = ({ isLoggedIn, userType }) => {
  const [eventList, setEventList] = useState(null)
  const getSettings = () => {
    return ({
      infinite: true,
      speed: 500,
      slidesToShow: eventList.length < 4 ? eventList.length : 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: eventList.length < 4 ? eventList.length : 4,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: eventList.length < 3 ? eventList.length : 3,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: eventList.length < 2 ? eventList.length : 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: eventList.length < 1 ? eventList.length : 1,
          }
        }
      ]
    })
  }
  useEffect(() => {
    axios.post("/events", { featured: true }).then(response => {
      setEventList(response.data.success ? response.data.events : [])
    }).catch(err => {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }, [])
  return (
    <>
      <Typography
        textAlign={"center"}
        fontWeight="bold"
        variant="h6"
        color="primary.main"
      >
        Events to participate
      </Typography>
      {eventList ? eventList.length > 0 ? 
      <Slider {...getSettings()}>
        {eventList.map(({ id, name, coverImage, eventDate, silverMemberPrice, goldMemberPrice, platinumMemberPrice }) => (
          <EventCard
            redirectLink={isLoggedIn ? "" : "/user/login?redirect="}
            id={id}
            key={id}
            name={name}
            coverImage={coverImage}
            eventDate={eventDate}
            price={isLoggedIn ? userType === "Silver" ? silverMemberPrice
            : userType === "Gold" ? goldMemberPrice
            : userType === "Platinum" ? platinumMemberPrice : silverMemberPrice
            : silverMemberPrice}
          />
        ))}
      </Slider>
      : "No results found." : "Fetching events."}
    </>
  );
};

export default EventCarousel;
