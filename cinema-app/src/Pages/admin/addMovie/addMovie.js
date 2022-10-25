import classes from './addMovie.module.css';
import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { addmovie } from '../../../Services/movieService';

export default function AddMovieForm(){

    const def = require("../../../Assets/uploadImage.jpg");
    const inputFileRef = useRef(null);
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(def);
    const [val, setVal]=useState([]);

    const initialFieldValues = {
      nameLocal: '',
      nameOriginal: '',
      trailer: '',
      duration: '',
      imageSrc: '',
      imageFile: null,
    };
    const [formValues, setFormValues] = useState(initialFieldValues);
    const [formErrors, setFormErrors] = useState({});
	  const [isSubmit, setIsSubmit] = useState(false);

    const handleDelete=(e, i)=>{
        e.preventDefault()
        const deletVal=[...val]
        deletVal.splice(i,1)
        setVal(deletVal)
    }

    var data = [{ name: "Action" }, { name: "Genre" }, { name: "Comedy" }];

    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    const onChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        
        // our api to fetch the search result
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
      }
  
      return errors;
    };

    onsearch = (e) => {
      e.preventDefault();
      console.log(value);
      const abc = [...val, value]
      setVal(abc)
    }

    const handleSubmit = (e) => {

      e.preventDefault();
		  setFormErrors(validate(formValues));
		  setIsSubmit(true);
    };

    useEffect(() => {

      if(Object.keys(formErrors).length === 0 && isSubmit){

        let formData = new FormData();
        formData.append("nameLocal", formValues["nameLocal"]);
        formData.append("nameOriginal", formValues["nameOriginal"]);
        formData.append("trailer", formValues["trailer"]);
        formData.append("duration", formValues["duration"]);
        formData.append("imageFile", formValues["imageFile"]);
  
        addmovie(formData);
        
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
            setFormValues({...formValues, imageFile, imageSrc: reader.result })
        };
      }
      
    };

    return (<div>
      
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
			  <h1>Add a new movie:</h1>
        <img src={ preview } className={classes.uploadImage} onClick={onBtnClick} />
        <input name="file" onChange={changeHandler} ref={inputFileRef} type='file' hidden accept="image/*" />
			  <input type="text" name="nameLocal" placeholder="Movie name (Local)" value={formValues.nameLocal} onChange={handleChange} />
			  <input type="text" name="nameOriginal" placeholder="Original movie name" value={formValues.nameOriginal} onChange={handleChange} />
        <input type="text" name="duration" placeholder="Duration (minutes)" value={formValues.duration} onChange={handleChange} />
        <input type="text" name="trailer" placeholder="Trailer link" value={formValues.trailer} onChange={handleChange} />
        <div className={classes["search-container"]}>
          <div className={classes["search-inner"]}>
            <input type="text" placeholder="Search for a genre..." value={value} onChange={onChange} />
            <button className={classes.searchButton} onClick={e => onsearch(e)}>Add</button>
          </div>
          <div className={classes["dropdown"]}>
            {data
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
      <div className={classes.tagBox}>
      {val.map((data,i)=>{
            return(
               <div className={classes.tag}>
                    <div>{data}</div>
                    <button className={classes.tagButton} onClick={(e)=>handleDelete(e, i)}>x</button>
               </div>
            )
        })}
      </div>
			<button type="submit">Add Movie</button>
		</form>
    </div>);
}