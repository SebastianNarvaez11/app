import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    assistances: [],
    loadingStudents: false,
    loadingAssistances: false,
    isFetchingAssistance: false
}

export const assistanceSlice = createSlice({
    name: 'assitance',
    initialState,

    reducers: {

        getStudents: (state, action) => {
            state.students = action.payload
        },

        resetStudents: (state) => {
            state.students = []
        },

        setLoadingStudents: (state) => {
            state.loadingStudents = !state.loadingStudents
        },

        updateStudent: (state, action) => {
            state.students = state.students.map(student => student.id === action.payload.id ? (student = action.payload) : student)
        },

        setLoadingAssistance: (state) => {
            state.loadingAssistances = !state.loadingAssistances
        },

        setAssitances: (state, action) => {
            state.assistances = action.payload
        },

        setFetchingAssistances: (state) => {
            state.isFetchingAssistance = !state.isFetchingAssistance
        },

        addAssistances: (state, action) => {
            state.assistances = [...state.assistances, action.payload]
        }
    }
})





export const { getStudents,
    setLoadingStudents,
    resetStudents,
    updateStudent,
    setLoadingAssistance,
    setFetchingAssistances,
    setAssitances,
    addAssistances } = assistanceSlice.actions

export default assistanceSlice.reducer
