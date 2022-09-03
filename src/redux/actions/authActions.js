import axios from 'axios';
import { startLoading, stopLoading } from '../slices/uiSlice';
import { login, logout } from '../slices/authSlice';
import { host } from '../../helpers/host';




export const loginUser = (credentials) => (dispatch) => {

    dispatch(startLoading())
    let url = `${host}api/v1/auth/login`

    axios.post(url, credentials)
        .then(response => {
            dispatch(login(response.data))
            dispatch(stopLoading())
        })
        .catch(error => {
            dispatch(stopLoading())
            console.log(error.response.data);
        })
}

export const logoutUser = () => (dispatch) => {
    dispatch(startLoading())
    dispatch(logout())
    dispatch(stopLoading())
}