import classes from './editMovie.module.css';
import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { getMovie, getImage, updateMovie } from '../../../Services/movieService';
import { getGenres } from '../../../Services/genreService';
import BasicSnackbar from '../../../Components/snackbar/snackbar';

export default function EditMovieForm({ id }){

    const def = require("../../../Assets/uploadImage.jpg");
    const inputFileRef = useRef(null);
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(def);
    const [val, setVal]= useState([]);
    const [addClicked, setAddClicked] = useState(false);
    const [genreData, setGenreData] = useState([]);

    const [snackbarOpen, setsnackbarOpen] = useState(false);
	  const [snackbarContent, setsnackbarContent] = useState("");
	  const [snackbarType, setsnackbarType] = useState(0);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
	  const [isSubmit, setIsSubmit] = useState(false);

    const handleDelete=(e, i)=>{
        e.preventDefault()
        const deletVal=[...val]
        deletVal.splice(i,1)
        setVal(deletVal)
    };

    const handleSnackbarClose = () => {

      setsnackbarOpen(false);
    };

    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    const onChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        
    };

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
    };
    
    const validate = (e) => {

      const errors = {}
      
      if(!formValues.nameLocal){
        errors.nameLocal = "Localized name is required.";
      }
      if(!formValues.nameOriginal){
        errors.nameOriginal = "Original movie title is a required field.";
      }
      if(!formValues.duration){
        errors.duration = "Duration of the movie is a required field.";
      }else if(formValues. duration < 1){
        errors.duration = "Duration must be a positive number greater than zero.";
      }
  
      return errors;
    };

    const onsearch = (e) => {
      e.preventDefault();
      setAddClicked(true);
      
    }

    useEffect(() => {

      const obj = genreData.find(t => t.name === value);

      if(obj !== undefined && (val.includes(obj.name) === false)){
        const abc = [...val, value];
        setVal(abc);
      }

      setAddClicked(false);

    }, [addClicked]);

    const handleSubmit = (e) => {

      e.preventDefault();
		  setFormErrors(validate(formValues));
		  setIsSubmit(true);
    };

    useEffect(() => {
        getMovie(id).then(function (response){
            const data = response["data"];
    
            getImage(id).then(function (response){
    
                const file = new Blob([response.data], {type:'image/png'});
                const url = URL.createObjectURL(file);
                setPreview(url);
            });
    
            const initialFieldValues = {
                movieId: data.movieId,
                nameLocal: data.nameLocal,
                nameOriginal: data.nameOriginal,
                trailer: data.trailer,
                duration: data.duration,
                imageFile: null
            };
            setVal(data["genres"]);
    
            console.log(initialFieldValues);
            setFormValues(initialFieldValues);
    
          });
    
          getGenres().then(function (response){
            setGenreData(response["data"]);
          });

    }, []);

    useEffect(() => {

      if(Object.keys(formErrors).length === 0 && isSubmit){

        let formData = new FormData();
        formData.append("movieId", formValues["movieId"]);
        formData.append("nameLocal", formValues["nameLocal"]);
        formData.append("nameOriginal", formValues["nameOriginal"]);
        if(formValues["trailer"] !== ""){
          formData.append("trailer", formValues["trailer"]);
        }else{
          formData.append("trailer", "No link");
        }
        formData.append("duration", formValues["duration"]);
        val.map((x) => { formData.append("genres[]", x) });
        formData.append("imageFile", formValues["imageFile"]);

        updateMovie(formData).then(function (x){
            setsnackbarType(0);
            setsnackbarContent("Movie edited successfully.");
			setsnackbarOpen(true);
        }).catch(function (response){
            setsnackbarType(1);
            setsnackbarContent(response["data"]);
			setsnackbarOpen(true);
        });
        
        setIsSubmit(false);
      }

    }, [isSubmit]);

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);

        if(event.target.files && event.target.files[0]){
          let imageFile = event.target.files[0]
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => {
            setPreview(reader.result);
            setFormValues({...formValues, imageFile, imageSrc: reader.result });
        };
      }
      
    };

    return (<div>
      
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <BasicSnackbar center={true} type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
		<h1>Edit a movie:</h1>
        <img src={ preview } className={classes.uploadImage} onClick={onBtnClick} />
        <input name="file" onChange={changeHandler} ref={inputFileRef} type='file' hidden accept="image/*" />
        <p className={classes.errors}>{formErrors.imageFile}</p>
			  <input type="text" name="nameLocal" placeholder="Movie name (Local)" value={formValues.nameLocal} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.nameLocal}</p>
			  <input type="text" name="nameOriginal" placeholder="Original movie name" value={formValues.nameOriginal} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.nameOriginal}</p>
        <input type="number" name="duration" placeholder="Duration (minutes)" value={formValues.duration} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.duration}</p>
        <input type="text" name="trailer" placeholder="Trailer link" value={formValues.trailer} onChange={handleChange} />
        <div className={classes["search-container"]}>
          <div className={classes["search-inner"]}>
            <input type="text" placeholder="Search for a genre..." value={value} onChange={onChange} />
            <button className={classes.searchButton} onClick={e => onsearch(e)}>Edit</button>
          </div>
          <div className={classes["dropdown"]}>
            {genreData
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const name = item.name.toLowerCase();

                return (
                  searchTerm &&
                  name.startsWith(searchTerm) &&
                  name !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.name)}
                  className={classes["dropdown-row"]}
                  key={item.name}
                >
                  {item.name}
                </div>
              ))}
          </div>
      </div>
      <Grid container className={classes.tagBox}>
      {val.map((data,i)=>{
            return(
               <Grid item xs={4} md={4} className={classes.tag}>
                    <div>{data}</div>
                    <button className={classes.tagButton} onClick={(e)=>handleDelete(e, i)}>x</button>
               </Grid>
            )
        })}
      </Grid>
			<button type="submit">Edit Movie</button>
		</form>
    </div>);
}