import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        status: 'searching',
        categoriesWithMoreVacancies: null,
        allCategoriesForm: null,
        allCategories: null,
        totalPages: null
    },
    reducers: {
        onLoadAllCategories: ( state, { payload } ) => {
            state.allCategoriesForm = payload;
            state.status = 'completed';
        },
        onLoadCategoriesFailed: ( state, { payload } ) => {
            state.status = 'completed';
        },
        onLoadCategoriesWithMoreVacancies: (state, { payload }) => {
            state.categoriesWithMoreVacancies = payload;
            state.status = 'completed';
        },
        onLoadCategories: ( state, { payload } ) => {
            state.allCategories = payload.categories;
            state.totalPages = payload.totalPages;
            state.status = 'completed';
        }
    }
});

export const {
    onLoadAllCategories,
    onLoadCategoriesFailed,
    onLoadCategoriesWithMoreVacancies,
    onLoadCategories
} = categorySlice.actions;