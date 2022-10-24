import axios from 'axios';

const baseUrl = "http://localhost:5174/api/genres/";

const getGenres = () => {
    return axios.get(baseUrl);
}

const addGenre = (formData) => {
    return axios.post(baseUrl, formData);
}

const getGenre = (formData) => {

    return axios.get(baseUrl + formData.name);
}

const deleteGenre = (formData) => {
    return axios.delete(baseUrl + formData.name);
}

const updateGenre = (formData) => {
    return axios.put(baseUrl + formData.name + "/" + formData.newName);
}

export { getGenres, addGenre, getGenre, deleteGenre, updateGenre }