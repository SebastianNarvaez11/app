import { getData } from './asyncStorage'
import { restore, set_checking } from '../redux/slices/authSlice'



export const existToken = async (dispatch) => {

    // Codigo que se ejecuta cada vez que se inicia la aplicacion (solo una vez, por el useEffect) y se encarga 
    // de validar si el usuario esta autenticado en la aplicacion

    try {
        // #1 - Primero se traen los valores del asingStorage
        const token = await getData('TOKEN')
        const user = await getData('USER')

        // #2 - Despues validamos que esos valores de asingStorage no sean nulos
        if ((user !== null) && (token !== null)) {
            // si los valores no son nulos, entonces significa que el usuario no cerro secion al cerrar la aplicacion
            // por lo cual debemos setear los valores que estan en el asignStorage en el store de redux (token y user) 
            // debido a que el store de redux se reinicia y pierde estos valores,
            // tambien se debe cambiar el valor de isAuthenticated a true y el valor de isChecking a falso, con el fin de que 
            // react navigation habilite las rutas protegidas 
            dispatch(restore({ token, user: JSON.parse(user) }))
        } else {
            // si los valores del asignStorage son nulos, significa el usuario cerro secion antes de salir
            // por lo tanto debe loguearse nuevamente, procedemos a cambiar el valor de isCheking a falso, para que
            // la navegacion muestre la ruta del login
            dispatch(set_checking())
        }

    } catch (error) {
        console.log(error);
    }
}