// @Author: Kishan Thakkar
import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import Carousel1 from "../../../Assets/images/Carousel-1.jpg"
import Carousel2 from "../../../Assets/images/Carousel-2.jpg"

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      color={"white"}
      className="homepage-slick-arrow"
      style={{ ...style, right: 30, fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10230;
    </Box>
  );
};

const PrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <Box
      color={"white"}
      className="homepage-slick-arrow"
      style={{ ...style, left: 30, fontSize: "1.2rem" }}
      onClick={onClick}
    >
      &#10229;
    </Box>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const BannerCarousel = () => {
  return (
    <Box>
      <Slider style={{ height: "50vh" }} {...settings}>
        <Box position={"relative"} sx={{ "& img": { height: "50vh", width: "100%", objectFit: "cover", objectPosition: "bottom" } }} key={1}>
          <Box component={"img"} src={Carousel1} alt="Part" />
          <Box position={"absolute"} top="50%" left="10%" sx={{ transform: "translate(0%, -50%)", maxWidth: "320px" }}>
            <Typography component={"div"} color="white" fontSize="1.5rem">Welcome to</Typography>
            <Typography component={"div"} color="white" fontSize="2rem" fontWeight="bold">DalClub.</Typography>
          </Box>
        </Box>
        <Box position={"relative"} sx={{ "& img": { height: "50vh", width: "100%", objectFit: "cover", objectPosition: "bottom" } }} key={1}>
          <Box component={"img"} src={Carousel2} alt="Part" />
          <Box position={"absolute"} top="50%" left="10%" sx={{ transform: "translate(0%, -50%)", maxWidth: "320px" }}>
            <Typography component={"div"} color="white" fontSize="2rem" fontWeight="bold">Attractions</Typography>
            <Typography component={"div"} color="white" fontSize="1.5rem">Come and enjoy your day with loved ones.</Typography>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};

export default BannerCarousel;
