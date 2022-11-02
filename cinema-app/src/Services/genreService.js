import axios from 'axios';

const baseUrl = "http://localhost:5174/api/genres/";

const getGenres = () => {
    return axios.get(baseUrl);
}

const addGenre = (formData) => {
    return axios.post(baseUrl, formData);
}

const getGenre = (id) => {

    return axios.get(baseUrl + id);
}

const deleteGenre = (id) => {
    return axios.delete(baseUrl + id);
}

const updateGenre = (formData) => {
    return axios.put(baseUrl + formData.id + "/" + formData.name);
}

const getPaginatedGenres = (data) => {

    return axios.get(baseUrl + "getPaginated/", { params: data });
}

export { getGenres, addGenre, getGenre, deleteGenre, updateGenre, getPaginatedGenres }