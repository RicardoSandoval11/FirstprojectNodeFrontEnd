import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        registerSucessMsg: null,
        registerFailedMsg: null,
        activateAccountSuccessMsg: null,
        activateAccountFailedMsg: null,
        recoverPasswordSuccessRequestMsg: null,
        recoverPasswordFailedRequestMsg: null,
        verifyCodeSuccessMsg: null,
        verifyCodeFailedMsg: null,
        updatePasswordMsg: null,
        updatePasswordMsgFailed: null,
        LoginFailed: null
    },
    reducers: {
        onLogin: ( state ) => {
            state.status = 'authenticated';
        },
        onLoginFailed: ( state, { payload } ) => {
            state.LoginFailed = payload;
            state.status = 'not-authenticated';
        },
        onRegister: ( state, { payload } ) => {
            state.registerSucessMsg = payload.msg;
            state.status = 'not-authenticated';
        },
        onRegisterFailed: ( state, { payload } ) => {
            state.registerFailedMsg = payload.msg;
            state.status = 'not-authenticated';
        },
        onActivateAccountSuccess: ( state, {payload} ) => {
            state.activateAccountSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onActivateAccountFailed: ( state, {payload} ) => {
            state.activateAccountFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onRecoverPasswordRequestSuccess: ( state, { payload } ) => {
            state.recoverPasswordSuccessRequestMsg = payload;
            state.status = 'not-authenticated';
        },
        onRecoverPasswordRequestFailed: ( state, {payload} ) => {
            state.recoverPasswordFailedRequestMsg = payload;
            state.status = 'not-authenticated';
        },
        onVerifyCodeSuccess: ( state, { payload } ) => {
            state.verifyCodeSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onVerifyCodeFailed: ( state, { payload } ) => {
            state.verifyCodeFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onUpdatePassword: ( state, { payload } ) => {
            state.updatePasswordMsg = payload;
            state.status = 'not-authenticated';
        },
        onUpdatePasswordFailed: ( state, { payload } ) => {
            state.updatePasswordMsgFailed = payload;
            state.status = 'not-authenticated';
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
        },
        onChecking: ( state ) => {
            state.status = 'checking';
        },
        onClearMessages: ( state ) => {
            state.registerFailedMsg = null;
            state.registerSucessMsg = null;
            state.activateAccountFailedMsg = null;
            state.activateAccountSuccessMsg = null;
            state.recoverPasswordSuccessRequestMsg = null;
            state.recoverPasswordFailedRequestMsg = null;
            state.verifyCodeSuccessMsg = null;
            state.verifyCodeFailedMsg = null;
            state.updatePasswordMsg = null;
            state.updatePasswordMsgFailed = null;
            state.LoginFailed = null;
            state.status = 'not-authenticated';
        }
    }
});

export const {
    onLogin,
    onLoginFailed,
    onRegister,
    onRegisterFailed,
    onActivateAccountSuccess,
    onActivateAccountFailed,
    onRecoverPasswordRequestSuccess,
    onRecoverPasswordRequestFailed,
    onVerifyCodeSuccess,
    onVerifyCodeFailed,
    onUpdatePassword,
    onUpdatePasswordFailed,
    onLogout,
    onChecking,
    onClearMessages
} = authSlice.actions;