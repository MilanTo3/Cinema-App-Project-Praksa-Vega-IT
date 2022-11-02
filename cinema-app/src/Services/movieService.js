import axios from 'axios';

const baseUrl = "http://localhost:5174/api/movies/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user.token}`
    }
});

const addmovie = (formData) => {
 
    return authAxios.post(baseUrl, formData);
}

const getMovies = () => {

    return axios.get(baseUrl);
}

const getMovie = (id) => {

    return axios.get(baseUrl + id);
}

const deleteMovie = (id) => {

    return authAxios.delete(baseUrl + id);
}

const getImage = (id) => {
    var config = {
        responseType: 'blob'
    };

    return axios.get(baseUrl + "getImage/" + id, config);
}

const updateMovie = (formData) => {
    return authAxios.put(baseUrl, formData);
}

const getMoviesWithScreenings1 = (data) => {

    var day = data.date ? data.date:new Date();
    var genres = data.genres ? data.genres:[];

    var parameters = { sort: data.sort, day: day, genres: genres };

    return axios.get(baseUrl + "getWithScreensFilter/", { params: parameters });
}

const getMoviesWithScreenings = () => {

    return axios.get(baseUrl + "getWithScreens/");
}

const getPaginatedMovies = (data) => {

    return authAxios.get(baseUrl + "getPaginated/", { params: data });
}

export { addmovie, getMovies, deleteMovie, getMovie, getImage, updateMovie, getMoviesWithScreenings, getMoviesWithScreenings1, getPaginatedMovies };