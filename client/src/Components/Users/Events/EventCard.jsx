// @Author: Kishan Thakkar
import { Box, Typography, Grid } from "@mui/material";
import { format, parseISO } from "date-fns";
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Link } from "react-router-dom"

const EventCard = ({ id, name="", coverImage, eventDate, price, redirectLink="" }) => {
  return (
    <Box
      key={id}
      borderRadius={1}
      border={"1px solid lightgray"}
      margin={1.25}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 0 5px -1px",
        },
      }}
    >
      <Link to={`${redirectLink}/eventDetails/${id}`}>
        <img
          src={coverImage || `https://via.placeholder.com/600x400?text=${name.replace(" ", "+")}`}
          alt={name}
          width="100%"
          height="100%"
        />
        <Grid
          container
          p={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={10}>
            <Typography
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
          </Grid>
          <Grid item xs={2}>
            {price && <Typography fontWeight={"bold"} color="secondary.light">
              ${price}
            </Typography>}
          </Grid>
        </Grid>
      </Link>
    </Box>
  );
};

export default EventCard;
