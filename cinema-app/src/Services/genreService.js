import axios from 'axios';

const baseUrl = "http://localhost:5174/api/genres/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user.token}`
    }
});

const getGenres = () => {
    return axios.get(baseUrl);
}

const addGenre = (formData) => {
    return authAxios.post(baseUrl, formData);
}

const getGenre = (id) => {

    return axios.get(baseUrl + id);
}

const deleteGenre = (id) => {
    return authAxios.delete(baseUrl + id);
}

const updateGenre = (formData) => {
    return authAxios.put(baseUrl + formData.id + "/" + formData.name);
}

const getPaginatedGenres = (data) => {

    return authAxios.get(baseUrl + "getPaginated/", { params: data });
}

export { getGenres, addGenre, getGenre, deleteGenre, updateGenre, getPaginatedGenres }