import { createSlice } from '@reduxjs/toolkit';

export const vacancySlice = createSlice({
    name: 'vacancies',
    initialState: {
        status: 'searching',
        createVacancySuccessMsg: null,
        createVacancyFailedMsg: null,
        UpdateVacancyMsg: null,
        UpdateVacancyFailed: null,
        deleteVacancyMsg: null,
        deleteVacancyFailedMsg: null,
        vacancyDetails: null,
        myVacancies: null,
        totalPages: null,
        vacanciesOfPopularCategories: null,
        recentVacancies: null,
        vacanciesByCategory: null,
        loadVacanciesByCategoryFailedMsg: null,
        allVacancies: []
    },
    reducers: {
        onCreateVacancySuccess: ( state, { payload } ) => {
            state.createVacancySuccessMsg = payload;
            state.status = 'completed'
        },
        onCreateVacancyFailed: ( state, { payload } ) => {
            state.createVacancyFailedMsg = payload;
            state.status = 'completed';
        },
        onLoading: ( state ) => {
            state.status = 'loading';
        },
        onClearMessages: ( state ) => {
            state.createVacancySuccessMsg = null;
            state.createVacancyFailedMsg = null;
            state.UpdateVacancyMsg = null;
            state.UpdateVacancyFailed = null;
            state.deleteVacancyMsg = null;
            state.deleteVacancyFailedMsg = null;
            state.loadVacanciesByCategoryFailedMsg = null;
        },
        onUpdateVacancy: ( state, { payload } ) => {
            state.UpdateVacancyMsg = payload;
            state.status = 'completed'
        },
        onUpdateVacancyFailed: ( state, { payload } ) => {
            state.UpdateVacancyFailed = payload;
            state.status = 'completed';
        },
        onLoadVacancyDetails: ( state, { payload } ) => {
            state.vacancyDetails = payload;
            state.status = 'completed';
        },
        onLoadVacancyDetailsFailed: ( state ) => {
            state.status = 'completed';
        },
        onDeleteVacancy: ( state, { payload } ) => {
            state.deleteVacancyMsg = payload;
            state.status = 'completed';
        },
        onDeleteVacancyFailed: ( state, { payload } ) => {
            state.deleteVacancyFailedMsg = payload;
            state.status = 'completed';
        },
        onLoadMyVacancies: ( state, { payload } ) => {
            state.myVacancies = payload.vacancies;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        },
        onLoadMyVacanciesFailed: ( state ) => {
            state.status = 'completed';
        },
        onLoadVacanciesOfPopularCategories: ( state, { payload } ) => {
            state.vacanciesOfPopularCategories = payload;
            state.status = 'completed';
        },
        onLoadMostRecentVacancies: ( state, { payload } ) => {
            state.recentVacancies = payload;
            state.status = 'completed';
        },
        onLoadvacanciesByCategory: ( state, { payload } ) => {
            state.vacanciesByCategory = payload.vacancies;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        },
        onLoadVacanciesByCategoryFailed: ( state, { payload } ) => {
            state.loadVacanciesByCategoryFailedMsg = payload;
            state.status = 'completed';
        },
        onLoadAllVacancies: (state, { payload }) => {
            state.allVacancies=payload.vacancies;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        }
    }
});

export const {
    onCreateVacancySuccess,
    onCreateVacancyFailed,
    onLoading,
    onClearMessages,
    onUpdateVacancy,
    onUpdateVacancyFailed,
    onLoadVacancyDetails,
    onLoadVacancyDetailsFailed,
    onDeleteVacancy,
    onDeleteVacancyFailed,
    onLoadMyVacancies,
    onLoadMyVacanciesFailed,
    onLoadVacanciesOfPopularCategories,
    onLoadMostRecentVacancies,
    onLoadvacanciesByCategory,
    onLoadVacanciesByCategoryFailed,
    onLoadAllVacancies
} = vacancySlice.actions;