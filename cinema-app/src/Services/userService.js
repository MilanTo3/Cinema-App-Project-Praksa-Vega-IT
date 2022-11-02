import axios from 'axios';

const baseUrl = "http://localhost:5174/api/users/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const getUsers = () => {
    return authAxios.get(baseUrl + "getusers");
}

const getUser = (id) => {
    return authAxios.get(baseUrl + "getuser/" + id);
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