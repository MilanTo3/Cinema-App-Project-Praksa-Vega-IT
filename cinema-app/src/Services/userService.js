import axios from 'axios';

const baseUrl = "http://localhost:5174/api/users/";

const getUsers = () => {
    return axios.get(baseUrl + "getusers");
}

const registerUser = (formData) => {
    return axios.post(baseUrl + "registerUser", formData);
}

const loginUser = (formData) => {
    return axios.post(baseUrl + "loginUser", formData);
}

export { getUsers, registerUser, loginUser }