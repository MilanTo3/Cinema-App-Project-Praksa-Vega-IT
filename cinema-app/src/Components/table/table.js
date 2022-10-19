import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(name, email, birthday) {
  return { name, email, birthday };
}

const rows = [
  createData('Eirx', "erixon@gmail.com1", "21.01.2021"),
  createData('Firx', "erixon@gmail.com2", "22.01.2021"),
  createData('dirx', "erixon@gmail.com3", "23.01.2021"),

];

// Header names for customers, genres, movies, screenings.
const headersName = [["Customer name", "Email:", "Birthday:"],
                 ["Genre name:"],
                 ["Movie name:", "Original Name", "Duration"],
                 ["Screenings name:"]];

// Header keys for customers, genres, movies, screenings:
const headersKeys = [["name", "email", "birthday"], ["name"], ["name", "originalName"], ["name"]];

// Actions for customers, genres, movies, screenings:
const actions = [["Verify", "Block"], ["Edit", "Delete"], ["Edit", "Delete"], ["Edit", "Delete"]]
// 1: cutomer, 2: genre, 3: movie, 4: screening.

export default function BasicTable({dataType}) { // Koji header, i podaci.

  console.log(dataType);
  const dict = { "customers": 0, "genres": 1, "movies": 2, "screenings": 3 };
  const ind = dict[dataType];

  var headerName = headersName[ind];
  var headerKey = headersKeys[ind];
  var action = actions[ind];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerName.map((header) => (
                <TableCell align="left">
                    {header}
                </TableCell>
            ))}
            <TableCell align="left">
                    Action:
                </TableCell>
                <TableCell align="left">
                    <Button style={{backgroundColor: "#FF4B2B", color: "white"}}>Add New</Button>
                </TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.birthday}</TableCell>
              <TableCell align="left">{action.map((action) => ( <Button style={{backgroundColor: "#FF4B2B", color: "white", marginLeft: "4px"}}>{action}</Button> ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}