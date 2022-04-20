// @Author: Vishnu Sumanth
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Links from "@mui/material/Link";
import { Link } from "react-router-dom";
import { LinkSharp } from "@mui/icons-material";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import axios from "../../../Assets/config/axiosConfig";

function Action(props) {
  const [eventId, setEventID] = useState(props.id);
  const [rerender, setRerender] = useState(0);

  React.useEffect(() => {
    const getEvents = async () => {
      axios
        .post("/events/status", {
          id: eventId,
        })
        .then(function (response) {
          console.log(response.data[0].is_active);
          setRerender(response.data[0].is_active);
        })
        .catch(function (error) {
          toast.error("status not found");

          console.log(error);
        });
    };
    getEvents();
  }, []);
  function deleteE(event) {
    setEventID(props.id);

    console.log(eventId);
    axios
      .post("/events/delete-event", {
        id: eventId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        toast.error("couldn't delete event");

        console.log(error);
      });
    toast.success("Event deleted");

    window.location.reload(false);
  }
  function deactivateE(event) {
    setEventID(props.id);
    axios
      .post("/events/deactivate-event", {
        id: eventId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        toast.error("something went wrong");

        console.log(error);
      });

    toast.success("Event deactivated");

    window.location.reload(false);
  }
  function activateE(event) {
    setEventID(props.id);
    axios
      .post("/events/activate-event", {
        id: eventId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Something went wrong");
      });

    toast.success("Event activated");
    window.location.reload(false);
  }
  const preventDefault = (event) => event.preventDefault();
  return (
    <Box
      sx={{
        typography: "body1",
        "& > :not(style) + :not(style)": {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Button
        variant="contained"
        component="span"
        style={{ color: "white" }}
        onClick={deleteE}
      >
        Delete
      </Button>
      {rerender === 0 ? (
        <Button
          variant="contained"
          component="span"
          style={{ color: "white" }}
          onClick={activateE}
        >
          Activate
        </Button>
      ) : (
        <Button
          variant="contained"
          component="span"
          style={{ color: "white" }}
          onClick={deactivateE}
        >
          Deactivate
        </Button>
      )}
      <Button variant="contained" component="span" style={{ color: "white" }}>
        <Link to="/admin/dashboard/event/viewusers" state={{ id: eventId }}>
          View Users
        </Link>
      </Button>
    </Box>
  );
}

export default Action;
