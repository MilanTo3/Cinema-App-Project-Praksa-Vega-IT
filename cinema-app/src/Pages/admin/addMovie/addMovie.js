import classes from './addMovie.module.css';
import { useRef, useState } from 'react';

export default function AddMovieForm(){

    const def = require("../../../Assets/uploadImage.jpg");
    const inputFileRef = useRef(null);
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState(def);
    const [val, setVal]=useState([]);

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

    onsearch = (e) => {
      e.preventDefault();
      console.log(value);
      const abc = [...val, value]
      setVal(abc)
    }

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      
    };

    return (<div>
      
        <form style={{ textAlign: "center" }}>
			<h1>Add a new movie:</h1>
            <img src={ preview } className={classes.uploadImage} onClick={onBtnClick} />
            <input name="file" onChange={changeHandler} ref={inputFileRef} type='file' hidden accept="image/*" />
			<input type="text" placeholder="Movie name (Local)" />
			<input type="text" placeholder="Original movie name" />
            <input type="text" placeholder="Duration (minutes)" />
            <input type="text" placeholder="Trailer link" />
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