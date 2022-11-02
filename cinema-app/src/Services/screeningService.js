import axios from "axios";

const baseUrl = "http://localhost:5174/api/screenings/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const addScreening = (formData) => {
 
    return authAxios.post(baseUrl, formData);
}

const getScreenings = () => {

    return axios.get(baseUrl);
}

const getScreening = (id) => {

    return axios.get(baseUrl + id);
}

const deleteScreening = (id) => {

    return authAxios.delete(baseUrl + id);
}

const updateScreening = (formData) => {
    return authAxios.put(baseUrl, formData);
}

const getPaginatedScreenings = (data) => {

    return authAxios.get(baseUrl + "getPaginated/", { params: data });
}

export { addScreening, getScreening, getScreenings, deleteScreening, updateScreening, getPaginatedScreenings };