import { configureStore } from '@reduxjs/toolkit';
import { setData, delData } from '../helpers/asyncStorage';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';
import assistanceSlice from './slices/assistanceSlice'
import gradeSlice from './slices/gradeSlice'


const authMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {

        case 'auth/login':
            // PERSISTENCIA DEL TOKEN Y EL USUARIO
            await setData('TOKEN', action.payload.token)
            await setData('USER', JSON.stringify(action.payload.user))
            return next(action);

        case 'auth/logout':
            // SE REMUEVE LA PERSITENCIA
            await delData('TOKEN')
            await delData('USER')
            return next(action);


        default:
            next(action);
    }
}




const store = configureStore({
    reducer: {
        interface: uiSlice,
        auth: authSlice,
        assitance : assistanceSlice,
        grade : gradeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

export default store