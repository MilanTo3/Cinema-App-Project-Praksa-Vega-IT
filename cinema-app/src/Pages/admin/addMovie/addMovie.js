import classes from './addMovie.module.css';
import { useRef } from 'react';

export default function AddMovieForm(){

    const inputFileRef = useRef(null);
    const handleFile = () => {
        alert("Im handling.")
    };

    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    return (<div>

        <form style={{ textAlign: "center" }}>
			<h1>Add a new movie:</h1>
            <div className={classes.uploadImage} onClick={onBtnClick}>
                <input onChange={handleFile} ref={inputFileRef} type='file' hidden accept="image/*" />
                <p class="uploadText">Upload a poster</p>
            </div>
			<input type="text" placeholder="Movie name (Local)" />
			<input type="text" placeholder="Original movie name" />
            <input type="text" placeholder="Duration (minutes)" />
			<button type="submit">Add Movie</button>
		</form>

    </div>);
}