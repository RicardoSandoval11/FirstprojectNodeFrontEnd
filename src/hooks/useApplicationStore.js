import { useDispatch } from "react-redux";

import { appApi } from "../api/appApi";
import { onSendNewApplication,
        onSendNewApplicationFailed,
        onLoading,
        onClearMessages,
        onLoadApplicationsByVacancy,
        onLoadApplicationFailed,
        onLoadApplicationsByUser,
        onDeleteApplicationSuccess,
        onDeleteApplicationFailed } from '../store/application/applicationSlice';

export const useApplicationStore = () => {

    const dispatch = useDispatch();

    const startSendingNewApplication = async(applicationData) => {

        try {
            
            const { data } = await appApi.post('/api/applications/new-application',applicationData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onSendNewApplication(data.msg));

        } catch (error) {
            dispatch(onSendNewApplicationFailed(error.response.data.msg));
        }
    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    const startLoading = () => {
        dispatch(onLoading());
    }

    const startLoadingApplicationsByVacancy = async(vacancyId, page) => {
        try {
            const { data } = await appApi.get(`/api/applications/get-applications-by-vacancy/${vacancyId}?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadApplicationsByVacancy(data));

        } catch (error) {
            dispatch(onLoadApplicationFailed(error.response.data.msg));
        }
    }

    const startLoadingApplicationsByUser = async(page) => {
        try {
            
            const { data } = await appApi.get(`/api/applications/my-applications?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadApplicationsByUser(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startRemovingApplication = async(applicationId) => {

        try {
            
            const { data } = await appApi.delete(`/api/applications/delete-application/${applicationId}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onDeleteApplicationSuccess(data.msg));

        } catch (error) {
            
            dispatch(onDeleteApplicationFailed(error.response.data.msg));

        }

    }
    return {
        startSendingNewApplication,
        startClearingMessages,
        startLoading,
        startLoadingApplicationsByVacancy,
        startLoadingApplicationsByUser,
        startRemovingApplication
    }
}