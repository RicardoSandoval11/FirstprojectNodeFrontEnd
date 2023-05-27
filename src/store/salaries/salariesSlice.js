import { createSlice } from "@reduxjs/toolkit";

export const salariesSlice = createSlice({
    name: 'salaries',
    initialState: {
        status: 'searching',
        salaries: null
    },
    reducers: {
        onLoadAllSalaries: ( state, { payload } ) => {
            state.salaries = payload;
            state.status = 'completed';
        },
        onLoadSalariesFailed: ( state ) => {
            state.status = 'completed';
        },
    }
});

export const {
    onLoadAllSalaries,
    onLoadSalariesFailed
} = salariesSlice.actions;