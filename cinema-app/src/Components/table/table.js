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
import { deleteGenre, getPaginatedGenres } from '../../Services/genreService';
import { getPaginatedUsers } from '../../Services/userService';
import EditGenreFrom from '../../Pages/admin/editGenre/editGenre';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import classes from './table.module.css';
import BasicSnackbar from '../snackbar/snackbar';
import EditCustomerForm from '../../Pages/admin/editCustomer/editCustomer';
import { deleteMovie, getPaginatedMovies } from '../../Services/movieService';
import EditMovieForm from '../../Pages/admin/editMovie/editMovie';
import { deleteScreening, getPaginatedScreenings } from '../../Services/screeningService';
import EditScreeningForm from '../../Pages/admin/editScreening/editScreening';
import TablePagination from '@mui/material/TablePagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [actualLength, setActualLength] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  // toggle
  const [selectedLetters, setLetters] = React.useState([]);
  const [text, setText] = React.useState("");

  const handleFormat = (event, newFormats) => {
    setLetters(newFormats);
    
  };

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
  var typeTimeout = 0;

  const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);

  let startChar = "A";
  let endChar = "Z";
  const letters = [];
        
  for (let c = startChar.charCodeAt(0); c <= endChar.charCodeAt(0); c++) {
   letters.push(c); 
  }

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

    const editModals = [<EditCustomerForm id={id} />, <EditGenreFrom id={id}/>, <EditMovieForm id={id} />, <EditScreeningForm id={id} />];

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
    
    if(!isOpen){

      const data = {
        page: page,
        itemCount: rowsPerPage,
        letters: selectedLetters,
        searchTerm: text
  
      }

      if(dataType === "genres"){
        
        getPaginatedGenres(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
        }).catch(function (error){
          setheaderKeys(headersKeys[ind]);
          setData(rows[ind]);
        });

      }else if(dataType === "customers"){

        getPaginatedUsers(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
        }).catch(function (error){
          setheaderKeys(headersKeys[ind]);
          setData(rows[ind]);
        });

      }else if(dataType === "movies"){

        getPaginatedMovies(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
        }).catch(function (error){
          setheaderKeys(headersKeys[ind]);
          setData(rows[ind]);
        });

      }else if(dataType === "screenings"){

        getPaginatedScreenings(data).then(function (response){
          setData(response["data"].data);
          setActualLength(response["data"].actualCount);
        }).catch(function (error){
          setheaderKeys(headersKeys[ind]);
          setData(rows[ind]);
        });

      }else{
        setheaderKeys(headersKeys[ind])
        setData(rows[ind]);
      }
    }

  }, [selectedLetters, text, page, rowsPerPage, isOpen, snackbarOpen]);

  const CustomToggle = styled(ToggleButton)({
    color: '#ffffff',
    backgroundColor: "#ff4b2b",
    root: {
      "&.Mui-selected": {
        color: "#00FF00",
        backgroundColor: '#00FF00'
      },
      "&:hover": {
        color: '#00FF00',
        backgroundColor: '#00FF00'
      }
    }
  });

  const handleChange = (e) => {

    if(typeTimeout) clearTimeout(typeTimeout);
    typeTimeout = setTimeout(() => {
      setText(e.target.value);
    }, 1500);
  };
  
  return (
    <div>
      <ToggleButtonGroup
      color="primary"
      aria-label="Platform"
      value={selectedLetters}
      onChange={handleFormat}
      className={classes.letters} >
        {letters.map((x) => {
          return (<CustomToggle color="primary" value={String.fromCharCode(x)} className={classes.letter} >{String.fromCharCode(x)}</CustomToggle>)
        })}
      </ToggleButtonGroup>
      
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className={classes.container}>
      <TableContainer component={Paper}>
        <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              {headerName.map((header) => (
                  <StyledTableCell align="left">
                      {header}
                  </StyledTableCell>
              ))}
              <StyledTableCell align="left">
                      Action:
                  </StyledTableCell>
                  <StyledTableCell align="left">
                      <Button style={{backgroundColor: "#FF4B2B", color: "white"}} onClick={() => handleOpenModal()}>Add New</Button>
                      <TextField 
                      label="Search Name" size="small" style={{ float: 'right' }} onChange={handleChange}
                      InputProps={{ style: {backgroundColor: "white"},
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      />
                  </StyledTableCell>
            </StyledTableRow>
            
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow
                key={row[idName]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                { headerKey.map((key) => (
                  <StyledTableCell align="left">{row[key]}</StyledTableCell>
                ))}

                <StyledTableCell align="left">{action.map((action) => ( <Button onClick={() => handleAction(action, row[idName])} style={{backgroundColor: "#FF4B2B", color: "white", marginLeft: "4px"}}>{action}</Button> ))}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        
        <BasicModal isDialogOpened={isOpen} handleCloseDialog={() => setIsOpen(false)} content={modal} />

      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={actualLength}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  </div>
  );
}