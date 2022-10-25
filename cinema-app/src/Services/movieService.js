import axios from 'axios';

const baseUrl = "http://localhost:5174/api/movies/";

const addmovie = (formData) => {
 
    return axios.post(baseUrl, formData);
}

export {addmovie};