import axios from 'axios'
import { host } from '../../helpers/host'
import { setGrades, setLoadingGrades } from '../slices/gradeSlice'

export const fetchGrades = () => (dispatch) => {

    dispatch(setLoadingGrades())

    let url = `${host}api/v1/grades/list`

    axios.get(url)
        .then(response => {
            dispatch(setGrades(response.data))
            dispatch(setLoadingGrades())
        })
        .catch(error => {
            console.log(error.response);
            dispatch(setLoadingGrades())
        })
}