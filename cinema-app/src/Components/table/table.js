import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddMovieForm from '../../Pages/admin/addMovie/addMovie';
import AddGenreForm from '../../Pages/admin/addGenre/addGenre';
import AddScreeningForm from '../../Pages/admin/addScreenings/addScreening';
import BasicModal from '../modal/modal';

function createCustom(name, email, birthday) {
  return { name, email, birthday };
}

const rows = [
  [createCustom('Eirx', "erixon@gmail.com1", "21.01.2021"),
  createCustom('Firx', "erixon@gmail.com2", "22.01.2021"),
  createCustom('dirx', "erixon@gmail.com3", "23.01.2021")],
  [{ name: "Action" }, { name: "Comedy" }, { name: "Funny" }],
  [{ name: "Pirati sa Kariba", originalName: "Pirates of the Carribean", duration: "83m" }, { name: "Deda mrazov pomocnik", originalName: "Santa's helper", duration: "93m" }, {name: "Deda mrazov pomocnik", originalName: "Santa's helper", duration: "90m" }],
  [{ name: "Screening1" }, { name: "Screening2" }, { name: "Screening3" }]
];

// Header names for customers, genres, movies, screenings.
const headersName = [["Customer name", "Email:", "Birthday:"],
                 ["Genre name:"],
                 ["Movie name:", "Original Name", "Duration"],
                 ["Screenings name:"]];

// Header keys for customers, genres, movies, screenings:
const headersKeys = [["name", "email", "birthday"], ["name"], ["name", "originalName", "duration"], ["name"]];

// Actions for customers, genres, movies, screenings:
const actions = [["Edit", "Delete"], ["Edit", "Delete"], ["Edit", "Delete"], ["Edit", "Delete"]]
// 1: cutomer, 2: genre, 3: movie, 4: screening.
const addModals = ["", <AddGenreForm/>, <AddMovieForm/>, <AddScreeningForm/>]

export default function BasicTable({dataType}) { // Koji header, i podaci.

  // za basicModal komponentu:
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const dict = { "customers": 0, "genres": 1, "movies": 2, "screenings": 3 };
  const ind = dict[dataType];

  var headerName = headersName[ind];
  var headerKey = headersKeys[ind];
  var action = actions[ind];
  var data = rows[ind];
  var modal = addModals[ind];

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
                    <Button style={{backgroundColor: "#FF4B2B", color: "white"}} onClick={() => handleOpenModal()}>Add New</Button>
                </TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              { headerKey.map((key) => (
                <TableCell align="left">{row[key]}</TableCell>
              ))}

              <TableCell align="left">{action.map((action) => ( <Button style={{backgroundColor: "#FF4B2B", color: "white", marginLeft: "4px"}}>{action}</Button> ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <BasicModal isDialogOpened={isOpen} handleCloseDialog={() => setIsOpen(false)} content={modal} />

    </TableContainer>
  );
}