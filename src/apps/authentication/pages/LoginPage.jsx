import { useState, useEffect } from "react";

import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { AppLayout } from "../../../layout/AppLayout"
import { useAuthStore } from "../../../hooks/useAuthStore";


export const LoginPage = () => {

  const { startClearingMessages, startChecking, startLoginUser } = useAuthStore();

  const { activateAccountSuccessMsg,
          updatePasswordMsg, 
          updatePasswordMsgFailed, status, LoginFailed } = useSelector( state => state.auth );

  // Form validation
  const initialErrors = {
    email: null,
    password: null
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState(initialErrors);

  const onEmailChange = (event) => {
    if(!event.target.value.includes('@')){
      errors.email = 'Email must contains the @ symbol';
    }else if(!event.target.value.includes('.')){
      errors.email = 'Email must have a domain';
    }else{
      errors.email = null;
    }
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    if(event.target.value.length < 8){
      errors.password = 'password must have at least 8 characters';
    }else{
      errors.password = null;
    }
    setPassword(event.target.value);
  }

  // Submit the form
  const onSubmitLoginForm = (event) => {
    event.preventDefault();
    if(errors.email == null && errors.password == null){
      startChecking();
    }

  }

  const onLoginUser = () => {
    if(errors.email == null && errors.password == null){
      startLoginUser(email, password);
    }
  }

  // Activate account success
  useEffect(() => {
    if(activateAccountSuccessMsg != null){
      Swal.fire('Account Activated', activateAccountSuccessMsg, 'success');
      startClearingMessages();
    }
  },[activateAccountSuccessMsg]);

  // handle messages
  useEffect(() => {
    if(updatePasswordMsg != null){
      Swal.fire('Password Updated', updatePasswordMsg, 'success');
      startClearingMessages();
    }
  },[updatePasswordMsg]);

  useEffect(() => {
    if(updatePasswordMsgFailed != null){
      Swal.fire('Password Update Failed', updatePasswordMsgFailed, 'error');
      startClearingMessages();
    }
  },[updatePasswordMsgFailed]);

  // Login failed
  useEffect(() => {
    if(LoginFailed != null){
      Swal.fire('Login Failed', LoginFailed, 'error');
      startClearingMessages();
    }
  },[LoginFailed]);

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
            <Typography variant='h6' sx={{color: 'primary.main'}}>Login</Typography>
          </Grid>
          <form onSubmit={onSubmitLoginForm}>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid
                item
                display={errors.email == null ? 'none' : 'flex'}
                sx={{
                  justifyContent: 'center',
                  width: '100%',
                  mb: 2
                }}
              >
                <Alert severity="error" sx={{width:'100%'}}>{errors.email}</Alert>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  mb:2
                }}
              >
                <TextField 
                  label="Email" 
                  type='email'
                  variant="outlined"
                  fullWidth
                  onChange={onEmailChange}
                  value={email}
                />
              </Grid>
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
                  label="Password" 
                  variant="outlined"
                  fullWidth
                  onChange={onPasswordChange}
                  value={password}
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
                  onClick={onLoginUser}
                  type="submit"
                  disabled={status == 'checking'}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Link
              style={{
                display: 'block',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'primary.main'
              }}
              to={'/auth/register'}
            >
              Create Account
            </Link>
            <Link
              style={{
                display: 'block',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'primary.main'
              }}
              to={'/auth/recover-password'}
            >
              ¿Forgot Password?
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </AppLayout>
  )
}


