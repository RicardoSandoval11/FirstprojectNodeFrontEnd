import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AppLayout } from "../../../layout/AppLayout"
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useSelector } from "react-redux";
import { Checking } from "../../../ui/Checking";

export const UpdatePassword = () => {

    const navigate = useNavigate();

    const { code } = useParams();

  const { startVerifyChangePasswordCode, startUpdatingUserPassword } = useAuthStore();

  const { verifyCodeSuccessMsg, verifyCodeFailedMsg, status } = useSelector( state => state.auth );

  useEffect(() => {
    startVerifyChangePasswordCode(code);
  }, []);

  // Form validation
  const initialErrors = {
    password: null,
    passwordConfirmation: null
  };
  
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [errors, setErrors] = useState(initialErrors);

  const onPasswordChange = (event) => {
    if(event.target.value.length < 8){
      errors.password = 'password must have at least 8 characters';
    }else{
      errors.password = null;
    }
    setPassword(event.target.value);
  }

  const onPasswordConfirmationChange = (event) => {
    if(event.target.value != password){
      errors.passwordConfirmation = 'Passwords must be the same';
    }else{
      errors.passwordConfirmation = null;
    }
    setPasswordConfirmation(event.target.value);
  }
  
  // Submit the form
  const onSubmitUpdatePasswordForm = (event) => {
    event.preventDefault();
    if(errors.password == null && errors.passwordConfirmation == null){
      startChecking();
    }
    
  }
  
  const onUpdatepassword = () => {
        if(errors.password == null && errors.passwordConfirmation == null){
            startUpdatingUserPassword(code, password);
            navigate('/auth/login');
        }
  }
  
  return (
    <AppLayout>
        <Grid
            container
            sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 1400,
            marginX:'auto',
            }}
        >
        {
            verifyCodeFailedMsg == null && verifyCodeSuccessMsg == null ?
                <Checking/>
            :
                verifyCodeSuccessMsg != null && verifyCodeFailedMsg == null ?
                    <Grid
                    item
                    sx={{
                        backgroundColor:'white',
                        boxShadow: 3,
                        padding: {xs:1, md:2},
                        borderRadius: '10px',
                        width:{xs:'100%',sm:'70%', md:'45%', lg:'35%'}
                    }}
                    className= 'animate__animated animate__fadeIn animate__faster'
                    >
                    <Grid
                        item
                        xs={12}
                        sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        m: 1
                        }}
                    >
                        <Typography variant='h6' sx={{color: 'primary.main'}}>Update Password</Typography>
                    </Grid>
                    <form onSubmit={onSubmitUpdatePasswordForm}>
                        <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        >
                        
                        <Grid
                            item
                            display={errors.password == null ? 'none' : 'flex'}
                            sx={{
                            justifyContent: 'center',
                            width: '100%',
                            mb: 2
                            }}
                        >
                            <Alert severity="error" sx={{width:'100%'}}>{errors.password}</Alert>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                            mb:2
                            }}
                        >
                            <TextField 
                            type='password'
                            label="New Password" 
                            variant="outlined"
                            fullWidth
                            onChange={onPasswordChange}
                            value={password}
                            />
                        </Grid>
                        <Grid
                            item
                            display={errors.passwordConfirmation == null ? 'none' : 'flex'}
                            sx={{
                            justifyContent: 'center',
                            width: '100%',
                            mb: 2
                            }}
                        >
                            <Alert severity="error" sx={{width:'100%'}}>{errors.passwordConfirmation}</Alert>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                            mb:2
                            }}
                        >
                            <TextField 
                            type='password'
                            label="Confirm Password" 
                            variant="outlined"
                            fullWidth
                            onChange={onPasswordConfirmationChange}
                            value={passwordConfirmation}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                            mb:2,
                            display: 'flex',
                            justifyContent: 'center'
                            }}
                        >
                            <Button
                                variant="contained"
                                disabled={ status == 'checking' }
                                onClick={onUpdatepassword}
                                type="submit"
                            >
                            Update
                            </Button>
                        </Grid>
                        </Grid>
                    </form>
                    </Grid>
                :
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Alert severity="error">Invalid Code</Alert>
                    </Grid>
            }
        </Grid>
    </AppLayout>
  )
}


