import axios from "axios";

const baseUrl = "http://localhost:5174/api/reservations/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const addReservation = (formData) => {
 
    return axios.post(baseUrl, formData);
}

const getReservations = () => {

    return axios.get(baseUrl);
}

const getReservation = (id) => {

    return axios.get(baseUrl + id);
}

const deleteReservation = (id) => {

    return authAxios.delete(baseUrl + id);
}

const updateReservation = (formData) => {
    return axios.put(baseUrl, formData);
}

const getReservedSeats = (id) => {
    return axios.get(baseUrl + id + "/getReserved");

}

const getMyReservations = (direction, email) => {

    const data = { state: direction, email: email }
    return authAxios.get(baseUrl + "getReservations/", { params: data });
};

const rateReservation = (form) => {
    return authAxios.put(baseUrl + "rateReservation/", form);
}

export { addReservation, getReservation, getReservations, deleteReservation, updateReservation, getReservedSeats, getMyReservations, rateReservation };