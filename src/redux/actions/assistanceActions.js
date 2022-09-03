import axios from 'axios'
import { host } from '../../helpers/host'
import { getStudents, setLoadingStudents, setLoadingAssistance, resetStudents, setFetchingAssistances, setAssitances, addAssistances } from '../slices/assistanceSlice'




export const getStudentsByGradeAndSchedule = (id, schedule) => (dispatch) => {

    dispatch(setLoadingStudents())

    let url = `${host}api/v1/students/grade/schedule/${id}/${schedule}`

    axios.get(url)
        .then(response => {
            dispatch(getStudents(response.data))
            dispatch(setLoadingStudents())
        })
        .catch(error => {
            console.log(error.response);
            dispatch(setLoadingStudents())
        })
}




export const getAssistancesToday = (schedule) => (dispatch) => {

    dispatch(setFetchingAssistances())

    let url = `${host}api/v1/assistance/list/${schedule}`

    axios.get(url)
        .then(response => {
            dispatch(setAssitances(response.data))
            dispatch(setFetchingAssistances())
        })
        .catch(error => {
            console.log(error);
            dispatch(setFetchingAssistances())
        })
}





export const createAssistance = (grade, schedule, students, toast, setShowAlert) => (dispatch) => {

    dispatch(setLoadingAssistance())

    let url = `${host}api/v1/assistance/create`

    axios.post(url, { grade, schedule, students })
        .then(response => {

            dispatch(addAssistances(response.data))
            dispatch(setLoadingAssistance())
            setShowAlert(false)

            toast.show({
                m: 10,
                title: "Asistencia Registrada",
                status: "success"
            })
        })
        .catch(error => {
            setShowAlert(false)
            console.log(error.response);
            dispatch(setLoadingAssistance())
            toast.show({
                title: "Account verified",
                status: "error",
                description: "Thanks for signing up with us."
            })
        })
}