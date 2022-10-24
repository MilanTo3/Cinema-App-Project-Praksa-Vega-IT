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

const requestReset = (formData) => {

    return axios.put(baseUrl + "requestReset/" + formData.email);
}

const passwordReset = (data) => {

    return axios.put(baseUrl + "passwordReset/" + data.email + "/" + data.token + "/" + data.password);
}

export { getUsers, registerUser, loginUser, passwordReset, requestReset }