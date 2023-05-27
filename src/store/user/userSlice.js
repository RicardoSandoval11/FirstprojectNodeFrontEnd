import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'searching',
        userDetails: null,
        updateUserInformationMsg: null,
        updateUserInformationFailedMsg: null
    },
    reducers: {
        onLoadUserDetails: ( state, { payload } ) => {
            state.userDetails = payload;
            state.status = 'completed';
        },
        onLoadUserDetailsFailed: ( state ) => {
            state.status = 'completed';
        },
        onLoading: ( state ) => {
            state.status = 'searching'
        },
        onUpdateUserInformation: ( state, { payload } ) => {
            state.updateUserInformationMsg = payload;
            state.status = 'completed';
        },
        onUpdateUserInformationFailed: ( state, { payload } ) => {
            state.updateUserInformationFailedMsg = payload;
            state.status = 'completed';
        },
        onClearMessages: ( state ) => {
            state.updateUserInformationMsg = null;
            state.updateUserInformationFailedMsg = null;
        }
    }
});

export const {
    onLoadUserDetails,
    onLoadUserDetailsFailed,
    onLoading,
    onUpdateUserInformation,
    onUpdateUserInformationFailed,
    onClearMessages
} = userSlice.actions;