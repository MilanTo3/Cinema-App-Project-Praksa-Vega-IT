import axios from "axios";

const baseUrl = "http://localhost:5174/api/reservations/";

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

    return axios.delete(baseUrl + id);
}

const updateReservation = (formData) => {
    return axios.put(baseUrl, formData);
}

const getReservedSeats = (id) => {
    return axios.get(baseUrl + "getReserved/" + id);

}

const getMyReservations = (direction, email) => {
    return axios.get(baseUrl + "getReservations/" + direction + "/" + email);
};

export { addReservation, getReservation, getReservations, deleteReservation, updateReservation, getReservedSeats, getMyReservations };