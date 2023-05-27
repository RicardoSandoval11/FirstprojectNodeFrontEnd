import { useDispatch } from "react-redux";

import { appApi } from "../api/appApi";
import {
        onLoadUserDetails,
        onLoadUserDetailsFailed,
        onLoading,
        onUpdateUserInformation,
        onUpdateUserInformationFailed,
        onClearMessages } from '../store/user/userSlice';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const startLoadingUserInformation = async() => {

        try {
            
            const { data } = await appApi.get('/api/users/my-information',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadUserDetails(data.user));

        } catch (error) {
            
            dispatch(onLoadUserDetailsFailed());

        }

    }

    const startupdateMyInformation = async(userData) => {
        try {
            
            const { data } = await appApi.put('/api/users/update-information',userData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onUpdateUserInformation(data.msg));

        } catch (error) {
            
            dispatch(onUpdateUserInformationFailed(error.response.data.msg));

        }
    }

    const startLoading = () => {
        dispatch(onLoading());
    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    return {
        startLoadingUserInformation,
        startLoading,
        startupdateMyInformation,
        startClearingMessages
    }
}