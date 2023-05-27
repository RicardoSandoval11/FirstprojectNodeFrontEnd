import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        status: 'searching',
        statuses: null
    },
    reducers: {
        onLoadStatus: ( state, { payload } ) => {
            state.statuses = payload;
            state.status = 'completed';
        },
        onLoadStatusFailed: ( state ) => {
            state.status = 'completed';
        }
    }
});

export const {
    onLoadStatus,
    onLoadStatusFailed
} = statusSlice.actions;