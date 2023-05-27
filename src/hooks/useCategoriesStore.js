import { useDispatch } from 'react-redux';

import { appApi } from '../api/appApi';
import { 
        onLoadAllCategories, 
        onLoadCategoriesFailed, 
        onLoadCategoriesWithMoreVacancies,
        onLoadCategories } from '../store/categories/categorySlice';

export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const startLoadingAllCategories = async() => {

        try {
            
            const { data } = await appApi.get('/api/categories/get-all-categories');

            dispatch(onLoadAllCategories(data.categories));

        } catch (error) {
            dispatch(onLoadCategoriesFailed());
        }

    }

    const startLoadingMostPopularCategories = async() => {
        try {
            const { data } = await appApi.get('/api/categories/get-most-popular-categories');

            dispatch(onLoadCategoriesWithMoreVacancies(data.categories));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingCategories = async(page, kword) => {
        try {
            
            const { data } = await appApi.get(`/api/categories/get-categories?page=${page}&kword=${kword}`);

            dispatch(onLoadCategories(data));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        startLoadingAllCategories,
        startLoadingMostPopularCategories,
        startLoadingCategories
    }
}