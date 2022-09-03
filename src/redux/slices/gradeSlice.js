import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    grades: [],
    loadingGrades: false
}

export const gradeSlice = createSlice({
    name: 'grade',
    initialState,

    reducers: {

        setGrades: (state, action) => {
            state.grades = action.payload
        },

        setLoadingGrades : (state) => {
            state.loadingGrades = !state.loadingGrades
        }

    }
})

export const { setGrades, setLoadingGrades } = gradeSlice.actions

export default gradeSlice.reducer
