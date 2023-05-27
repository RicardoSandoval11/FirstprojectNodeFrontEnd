import { appApi } from "../api/appApi";
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
        onRegister, 
        onRegisterFailed,
        onChecking,
        onClearMessages,
        onActivateAccountSuccess,
        onActivateAccountFailed,
        onRecoverPasswordRequestSuccess,
        onRecoverPasswordRequestFailed,
        onVerifyCodeSuccess,
        onVerifyCodeFailed,
        onUpdatePassword,
        onUpdatePasswordFailed, 
        onLogin,
        onLoginFailed,
        onLogout} from "../store/authentication/authSlice";


export const useAuthStore = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const startRegisterUser = async(registerData) => {
        try {
            
            const { data } = await appApi.post('/api/auth/register',registerData);

            dispatch(onRegister(data));

        } catch (error) {
            const { response } = error;

            dispatch(onRegisterFailed(response.data));
        }
    }

    const startChecking = () => {

        dispatch(onChecking());

    }

    const startClearingMessages = () => {

        dispatch(onClearMessages());

    }

    const startVerifyingActivationCode = async(code) => {

        
        try {

            const body = JSON.stringify({code: code});
    
            const { data } = await appApi.post('/api/auth/activate-account',body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            dispatch(onActivateAccountSuccess(data.msg));
    
            navigate('/auth/login');
            
        } catch (error) {
            dispatch(onActivateAccountFailed(error.response.data.msg));
        }

    }

    const startRequestUpdatePassword = async(email) => {
        const body = JSON.stringify({email: email});

        try {
            
            const { data } = await appApi.post('/api/auth/recover-password-request', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onRecoverPasswordRequestSuccess(data.msg));

        } catch (error) {
            dispatch(onRecoverPasswordRequestFailed(error.response.data.msg));
        }
    }

    const startVerifyChangePasswordCode = async(code) => {

        const body = JSON.stringify({code: code});

        try {
            const { data } = await appApi.post('/api/auth/validate-code', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onVerifyCodeSuccess(data.msg));
        } catch (error) {
            dispatch(onVerifyCodeFailed(error.response.data.msg));
        }

    }

    const startUpdatingUserPassword = async(code, password) => {
        const body = JSON.stringify({code: code, newPassword: password});

        try {
            const { data } = await appApi.post('/api/auth/update-password',body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onUpdatePassword(data.msg));

        } catch (error) {
            
            dispatch(onUpdatePasswordFailed(error.response.data.msg));
        }
    }

    const startLoginUser = async(email, password) => {

        const body = JSON.stringify({
            email: email,
            password: password
        });

        try {
            
            const { data } = await appApi.post('/api/auth/login',body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // save token
            localStorage.setItem('token', data.token);

            const decodedToken = jwtDecode(data.token);

            const { id, email } = decodedToken;

            localStorage.setItem('userId', id);
            localStorage.setItem('email', email);

            dispatch(onLogin());

            navigate('/');

        } catch (error) {

            dispatch(onLoginFailed(error.response.data.msg));
            
        }

    }

    const startCheckingToken = async() => {

        const token = localStorage.getItem('token');

        if(token == null || token == undefined){
            localStorage.clear();
            return dispatch(onLogout());
        }

        // Decode token
        const decodedToken = jwtDecode(token);

        const { exp } = decodedToken;

        const currentDate = Math.floor(new Date().getTime() / 1000);

        if(currentDate > exp){
            localStorage.clear();
            navigate('/auth/login');
            return dispatch(onLogout());
        }

        dispatch(onLogin());
        
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        // Methods
        startRegisterUser,
        startChecking,
        startClearingMessages,
        startVerifyingActivationCode,
        startRequestUpdatePassword,
        startVerifyChangePasswordCode,
        startUpdatingUserPassword,
        startLoginUser,
        startCheckingToken,
        startLogout
    }
}