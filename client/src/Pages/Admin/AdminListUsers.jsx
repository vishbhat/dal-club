// @Author: Anamika Ahmed
import React, { useState } from "react";
import Table from "@mui/material/Table";
import { styled } from '@mui/system';

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format, formatISO } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from '../../Components/Admin/Navbar';
import Sidebar from '../../Components/Admin/Sidebar';


import axios from "../../Assets/config/axiosConfig";
const ItemTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export default function Ctable() {
  const [lists, setEvents] = useState([]);
  const getEvents =() =>{
    // fetch("http://Web-dalclub.herokuapp.com/api/events/list_events")
    axios.get("/users/profile/getUsers").then((data)=>{
        setEvents(data.data.data);
        console.log(data.data.data);
    })
      
  }
React.useEffect(() => {
  
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

            </div>
            <div
              style={{
                marginTop: 10,
              }}
            >
                  <ItemTitleContainer>
                    <h1>List of Users</h1>
                </ItemTitleContainer>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">User ID</TableCell>
                      <TableCell align="right">User Name</TableCell>
                      <TableCell align="right">User Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lists.map((list) => (
                      <TableRow>
                        <TableCell align="right">{list.user_id}</TableCell>
                    
                        <TableCell align="right">
                          {list.user_name}
                        </TableCell>
                        <TableCell align="right">
                          {list.user_email}
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
