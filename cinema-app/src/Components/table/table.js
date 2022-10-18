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
  createData('Eirx', "erixon@gmail.com", "22.01.2021"),
  createData('Eirx', "erixon@gmail.com", "22.01.2021"),
  createData('Eirx', "erixon@gmail.com", "22.01.2021"),

];

const headersName = [["Customer name", "Email:", "Birthday:"],
                 ["Genre name:"],
                 ["Movie name:"]]

const headersKeys = [];

const actions = [["View", "Verify", "Block"], ["Edit", "Delete"], ["View", "Edit", "Delete"], ["View", "Edit", "Delete"]]

export default function BasicTable(props) { // Koji header, i podaci.
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            {headersName[0].map((header) => (
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
              <TableCell align="left">{actions[1].map((action) => ( <Button style={{backgroundColor: "#FF4B2B", color: "white", marginLeft: "4px"}}>{action}</Button> ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}