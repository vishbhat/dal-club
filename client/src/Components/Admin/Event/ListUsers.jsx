// @Author: Vishnu Sumanth
import axios from "../../../Assets/config/axiosConfig";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function ListUsers() {
  const location = useLocation();
  const { id } = location.state;
  const [eid, updateId] = useState(id);
  const [lists, setUsers] = useState({ data: { users: [{ userId: 2 }] } });
  React.useEffect(() => {
    const users = async () => {
      //   fetch("http://localhost:3005/api/events/booked-users")
      //     .then((result) => result.json())
      //     .then((body) => setUsers(body));
      axios
        .post("events/booked-users", {
          id: eid,
        })
        .then(function (response) {
          setUsers(response);
          console.log(eid);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    users();
  }, []);
  console.log(lists.data.users);

  return (
    <div>
      {lists.data.users.length === 0 ? (
        <h2>No users registered</h2>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists.data.users.map((list) => (
                <TableRow>
                  <TableCell align="left">{list.userId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ListUsers;
