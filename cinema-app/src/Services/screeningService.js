import axios from "axios";

const baseUrl = "http://localhost:5174/api/screenings/";

const addScreening = (formData) => {
 
    return axios.post(baseUrl, formData);
}

const getScreenings = () => {

    return axios.get(baseUrl);
}

const getScreening = (id) => {

    return axios.get(baseUrl + id);
}

const deleteScreening = (id) => {

    return axios.delete(baseUrl + id);
}

const updateScreening = (formData) => {
    return axios.put(baseUrl, formData);
}

export { addScreening, getScreening, getScreenings, deleteScreening, updateScreening };