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
import {useEffect} from 'react';
import { getGenres, deleteGenre } from '../../Services/genreService';
import { getUsers } from '../../Services/userService';
import EditGenreFrom from '../../Pages/admin/editGenre/editGenre';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import classes from './table.module.css';
import BasicSnackbar from '../snackbar/snackbar';
import EditCustomerForm from '../../Pages/admin/editCustomer/editCustomer';
import { getMovies, deleteMovie } from '../../Services/movieService';
import EditMovieForm from '../../Pages/admin/editMovie/editMovie';
import { addScreening, deleteScreening, getScreenings } from '../../Services/screeningService';

function createCustom(name, email, birthday) {
  return { name, email, birthday };
}

const rows = [
  [createCustom('Eirx', "erixon@gmail.com1", "21.01.2021"),
  createCustom('Firx', "erixon@gmail.com2", "22.01.2021"),
  createCustom('dirx', "erixon@gmail.com3", "23.01.2021")],
  [{ name: "Action" }, { name: "Comedy" }, { name: "Funny" }],
  [{ nameLocal: "Pirati sa Kariba", nameOriginal: "Pirates of the Carribean", duration: "83m" }, { nameLocal: "Deda mrazov pomocnik", nameOriginal: "Santa's helper", duration: "93m" }, {nameLocal: "Deda mrazov pomocnik 2", nameOriginal: "Santa's helper", duration: "90m" }],
  [{ name: "Screening1" }, { name: "Screening2" }, { name: "Screening3" }]
];

// Header names for customers, genres, movies, screenings.
const headersName = [["Customer name", "Email:", "Birthday:"],
                 ["Genre name:"],
                 ["Movie name:", "Original Name", "Duration"],
                 ["Screenings name:", "Projection starts:", "Row", "Column", "Price:"]];

// Header keys for customers, genres, movies, screenings:
const headersKeys = [["name", "email", "birthday"], ["name"], ["nameLocal", "nameOriginal", "duration"], ["name", "fromScreening", "row", "column", "price"]];
// Actions for customers, genres, movies, screenings:
const actions = [["Edit"], ["Edit", "Delete"], ["Edit", "Delete"], ["Edit", "Delete"]];
// 1: cutomer, 2: genre, 3: movie, 4: screening.
const addModals = ["", <AddGenreForm/>, <AddMovieForm/>, <AddScreeningForm/>];
const idNames = ["userId", "genreId", "movieId", "screeningId"];
const deleteCallback = ["", deleteGenre, deleteMovie, deleteScreening];

export default function BasicTable({dataType}) { // Koji header, i podaci.

  // za basicModal komponentu:
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [headerKeys, setheaderKeys] = React.useState([]);
  const [modal, setmodal] = React.useState([]);

  const dict = { "customers": 0, "genres": 1, "movies": 2, "screenings": 3 };
  const ind = dict[dataType];

  var headerName = headersName[ind];
  var headerKey = headersKeys[ind];
  var action = actions[ind];
  var addmodal = addModals[ind];
  var idName = idNames[ind];
  var deletecall = deleteCallback[ind];

  const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);

  const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  };
  
  const handleAction = (action, id) => {

    if(action === "Edit"){
      const model = determineModal(id);
      setmodal(model);
      setIsOpen(!isOpen);
    }else if(action === "Delete"){
      confirmDialog(id);
    }

  }

  const determineModal = (id) => {

    const editModals = [<EditCustomerForm id={id} />, <EditGenreFrom id={id}/>, <EditMovieForm id={id} />, ""];

    return editModals[ind];
  }

  const confirmDialog = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={classes["custom-ui"]}>
            <h1>Are you sure?</h1>
            <p>Do you wish to delete?</p>
            <button
              onClick={() => {
                deletecall(id).then(function (response){
                  setsnackbarType(0);
                  setsnackbarContent(response["data"]);
                  setsnackbarOpen(true);
                }).catch(function (response){
                  setsnackbarType(1);
                  setsnackbarContent(response["data"]);
                  setsnackbarOpen(true);
                });
                onClose();
              }}
            >
              Confirm
            </button>
            <button onClick={onClose}>No</button>
          </div>
        );
      }
    });
  };
  
  const handleOpenModal = () => {
    setmodal(addmodal);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    
    if(dataType === "genres"){
      
      getGenres().then(function (response){
				setData(response["data"]);
			}).catch(function (error){
        setheaderKeys(headersKeys[ind]);
        setData(rows[ind]);
			});

    }else if(dataType === "customers"){

      getUsers().then(function (response){
        setData(response["data"]);
      }).catch(function (error){
        setheaderKeys(headersKeys[ind]);
        setData(rows[ind]);
      });

    }else if(dataType === "movies"){

      getMovies().then(function (response){
        setData(response["data"]);
      }).catch(function (error){
        setheaderKeys(headersKeys[ind]);
        setData(rows[ind]);
      });

    }else if(dataType === "screenings"){

      getScreenings().then(function (response){
        setData(response["data"]);
      }).catch(function (error){
        setheaderKeys(headersKeys[ind]);
        setData(rows[ind]);
      });

    }else{
      setheaderKeys(headersKeys[ind])
      setData(rows[ind]);
    }

  }, [isOpen, snackbarOpen]);

  return (
    <TableContainer component={Paper} className={classes.container}>
      <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
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
              key={row[idName]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              { headerKey.map((key) => (
                <TableCell align="left">{row[key]}</TableCell>
              ))}

              <TableCell align="left">{action.map((action) => ( <Button onClick={() => handleAction(action, row[idName])} style={{backgroundColor: "#FF4B2B", color: "white", marginLeft: "4px"}}>{action}</Button> ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <BasicModal isDialogOpened={isOpen} handleCloseDialog={() => setIsOpen(false)} content={modal} />

    </TableContainer>
  );
}