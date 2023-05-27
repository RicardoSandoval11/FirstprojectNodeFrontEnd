import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        status: 'checking',
        newApplicationSuccessMsg: null,
        newApplicationFailedMsg: null,
        totalPages: null,
        applicationsByVacancy: null,
        loadApplicationsByVacancyFailedMsg: null,
        applicationsByUser: null,
        removeApplicationSuccessMsg: null,
        removeApplicationFailedMsg: null
    },
    reducers:{
        onSendNewApplication: ( state, { payload } ) => {
            state.newApplicationSuccessMsg = payload;
            state.status = 'completed';
        },
        onSendNewApplicationFailed: ( state, { payload } ) => {
            state.newApplicationFailedMsg = payload;
            state.status = 'completed';
        },
        onLoading: ( state ) => {
            state.status = 'loading';
        },
        onClearMessages: ( state ) => {
            state.newApplicationFailedMsg = null;
            state.newApplicationSuccessMsg = null;
            state.loadApplicationsByVacancyFailedMsg = null;
            state.removeApplicationSuccessMsg = null;
            state.removeApplicationFailedMsg = null;
        },
        onLoadApplicationsByVacancy: ( state, { payload } ) => {
            state.applicationsByVacancy = payload.applications;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        },
        onLoadApplicationFailed: ( state, { payload } ) => {
            state.loadApplicationsByVacancyFailedMsg = payload;
            state.status = 'completed';
        },
        onLoadApplicationsByUser: ( state, { payload } ) => {
            state.applicationsByUser = payload.applications;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        },
        onDeleteApplicationSuccess: ( state, { payload } ) => {
            state.removeApplicationSuccessMsg = payload;
            state.status = 'completed';
        },
        onDeleteApplicationFailed: ( state, { payload } ) => {
            state.removeApplicationFailedMsg = payload;
            state.status = 'completed';
        }
    }
});

export const {
    onSendNewApplication,
    onSendNewApplicationFailed,
    onLoading,
    onClearMessages,
    onLoadApplicationsByVacancy,
    onLoadApplicationFailed,
    onLoadApplicationsByUser,
    onDeleteApplicationSuccess,
    onDeleteApplicationFailed
} = applicationSlice.actions;