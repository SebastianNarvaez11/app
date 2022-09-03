import Axios from "axios";
import { getData, delData } from '../helpers/asyncStorage'


export const getToken = async () => {
    return await getData('TOKEN');
}

export const deleteToken = async () => {
    return await delData('TOKEN');
}

//Funcion que pasa el token en todas las solicitudes a la API
//Se tiene que llmar la funcionen Componente mas superior (APP en este caso)
export function initAxiosInterceptors() {
    Axios.interceptors.request.use(async (config) => {
        const token = await getToken();

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    });

    Axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401)  {
                deleteToken();
                // window.location = "/";
            } else {
                return Promise.reject(error);
            }
        }
    );
}