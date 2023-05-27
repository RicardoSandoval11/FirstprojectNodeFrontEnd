import { useDispatch } from 'react-redux';
import { appApi } from '../api/appApi';
import { 
        onCreateVacancySuccess,
        onCreateVacancyFailed,
        onClearMessages,
        onLoading,
        onLoadVacancyDetails,
        onLoadVacancyDetailsFailed,
        onUpdateVacancy,
        onUpdateVacancyFailed,
        onDeleteVacancy,
        onDeleteVacancyFailed,
        onLoadMyVacancies,
        onLoadMyVacanciesFailed,
        onLoadVacanciesOfPopularCategories,
        onLoadMostRecentVacancies,
        onLoadvacanciesByCategory,
        onLoadVacanciesByCategoryFailed,
        onLoadAllVacancies } from '../store/vacancies/vacancySlice';


export const useVacancyStore = () => {

    const dispatch = useDispatch();

    const startCreatingNewVacancy = async(vacancyData) => {

        try {

            const { data } = await appApi.post('/api/vacancies/create-new',vacancyData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onCreateVacancySuccess(data.msg));

        } catch (error) {
            dispatch(onCreateVacancyFailed(error.response.data.msg));
        }
    }

    const startLoadingVacancyDetails = async(vacancyId) => {

        try {
            
            const { data } = await appApi.get(`/api/vacancies/vacancy-details/${vacancyId}`);

            dispatch(onLoadVacancyDetails(data.vacancy));

        } catch (error) {
            
            dispatch(onLoadVacancyDetailsFailed());

        }

    }

    const startEditingVacancy = async(vacancyInformation, vacancyId) => {
        try {
            
            const { data } = await appApi.put(`/api/vacancies/update-vacancy/${vacancyId}`,vacancyInformation,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onUpdateVacancy(data.msg));

        } catch (error) {
            dispatch(onUpdateVacancyFailed(error.response.data.msg));
        }
    }

    const startDeletingVacancy = async(vacancyId) => {
        try {
            
            const { data } = await appApi.delete(`/api/vacancies/remove-vacancy/${vacancyId}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onDeleteVacancy(data.msg));

        } catch (error) {
            dispatch(onDeleteVacancyFailed(error.response.data.msg));
        }
    }

    const startLoadingMyVacancies = async(page) => {
        try {
                const { data } = await appApi.get(`/api/vacancies/my-vacancies?page=${page == null ? 0 : page}`,{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                });

                dispatch(onLoadMyVacancies(data));

        } catch (error) {
            dispatch(onLoadMyVacanciesFailed());
        }
    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    const startLoading = () => {
        dispatch(onLoading());
    }

    const startLoadingVacanciesOfPopularCategories = async() => {
        try {
            
            const { data } = await appApi.get('/api/vacancies/most-popular-category-vacancy');

            dispatch(onLoadVacanciesOfPopularCategories(data.vacancies));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingMostRecentVacancies = async() => {
        try {

            const { data } = await appApi.get('/api/vacancies/recent-vacancies');
            
            dispatch(onLoadMostRecentVacancies(data.vacancies));

        } catch (error) {
            console.log(error);
        }
    }

    const startloadingVacanciesByCategory = async(categoryId, page) => {
        try {
            
            const { data } = await appApi.get(`/api/vacancies/get-vacancies-by-category/${categoryId}?page=${page}`);

            dispatch(onLoadvacanciesByCategory(data));

        } catch (error) {
            dispatch(onLoadVacanciesByCategoryFailed(error.response.data.msg));
        }
    }

    const startLoadingAllVacancies = async(page, kword, salaryId, categoryId) => {

        let Url = `/api/vacancies/all-vacancies?page=${page}&kword=${kword}`;

        try {
            if(salaryId != ''){
                Url = Url+`&salaryId=${salaryId}`;
            }
            if(categoryId != ''){
                Url = Url+`&categoryId=${categoryId}`;
            }

            const { data } = await appApi.get(Url);

            dispatch(onLoadAllVacancies(data));


        } catch (error) {
            console.log(error);
        }
    }

    return {
        startCreatingNewVacancy,
        startClearingMessages,
        startLoading,
        startLoadingVacancyDetails,
        startEditingVacancy,
        startDeletingVacancy,
        startLoadingMyVacancies,
        startLoadingVacanciesOfPopularCategories,
        startLoadingMostRecentVacancies,
        startloadingVacanciesByCategory,
        startLoadingAllVacancies
    }
}