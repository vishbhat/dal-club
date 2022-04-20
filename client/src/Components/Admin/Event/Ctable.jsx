// @Author: Vishnu Sumanth
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Action from "./Action";
import { format, formatISO } from "date-fns";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "../../../Assets/config/axiosConfig";

export default function Ctable() {
  const [lists, setEvents] = useState([]);
  React.useEffect(() => {
    const getEvents = async () => {
      // fetch("http://Web-dalclub.herokuapp.com/api/events/list_events")
      axios
        .get("/events/list_events")
        .then((result) => result.data)
        .then((body) => setEvents(body))
        .then(() => console.log(lists));
    };
    getEvents();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
        <div className="container">
          <Sidebar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "8",
            }}
          >
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Link to="/admin/dashboard/addevent">
                <button
                  type="button"
                  style={{
                    width: 100,
                    color: "white",
                    backgroundColor: "orange",
                    borderRadius: 20,
                    height: 40,
                  }}
                >
                  add event
                </button>
              </Link>
            </div>
            <div
              style={{
                marginTop: 10,
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell align="right">Date Posted</TableCell>
                      <TableCell align="right">silver bookings</TableCell>
                      <TableCell align="right">gold bookings</TableCell>
                      <TableCell align="right">platinum bookings</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lists.map((list) => (
                      <TableRow>
                        <TableCell align="right">{list.name}</TableCell>
                        <TableCell align="right">
                          {format(
                            new Date(list.allow_booking_date),
                            "yyyy-MM-dd"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {list.Total_bookings}
                        </TableCell>
                        <TableCell align="right">
                          {list.Total_gold_bookings}
                        </TableCell>
                        <TableCell align="right">
                          {list.Total_platinum_bookings}
                        </TableCell>
                        <TableCell align="right">
                          <Action id={list.id}></Action>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
