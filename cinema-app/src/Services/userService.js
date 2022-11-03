import axios from 'axios';

const baseUrl = "http://localhost:5174/api/users/";
const authBase = "http://localhost:5174/api/auth/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const getUsers = () => {
    return authAxios.get(baseUrl);
}

const getUser = (id) => {
    return authAxios.get(baseUrl + id);
}

const registerUser = (formData) => {
    return axios.post(authBase + "registerUser", formData);
}

const loginUser = (formData) => {
    return axios.post(authBase + "loginUser", formData);
}

const requestReset = (formData) => {

    return axios.put(baseUrl + formData.email);
}

const passwordReset = (data) => {

    return axios.put(baseUrl + "passwordReset?email=" + data.email + "&token=" + data.token + "&password=" + data.password);
}

const adminReset = (email) => {

    return authAxios.put(baseUrl + "adminReset/" + email);
}

const blockUser = (id) => {

    return authAxios.put(baseUrl + "block/" + id);
}

const getPaginatedUsers = (data) => {

    return authAxios.get(baseUrl + "getPaginated/", { params: data });
}

export { getUsers, registerUser, loginUser, passwordReset, requestReset, getUser, blockUser, adminReset, getPaginatedUsers }