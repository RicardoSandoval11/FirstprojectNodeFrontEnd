import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AppLayout } from "../../../layout/AppLayout"
import { specialCharvalidation } from "../../../helpers/specialCharvalidation";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useSelector } from "react-redux";

export const RegisterPage = () => {

  const { registerSucessMsg, registerFailedMsg, status } = useSelector( state => state.auth );

  const { startRegisterUser, startChecking, startClearingMessages } = useAuthStore();

  
  
  // Form validation
  const initialErrors = {
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null
  };
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [errors, setErrors] = useState(initialErrors);
  
  const onNameChange = (event) => {
    if(event.target.value.length < 3){
      errors.name = 'The name is to short';
    }else if(specialCharvalidation(event.target.value)){
      errors.name = 'The name cannot contains special characters';
    }else{
      errors.name = null;
    }
    setName(event.target.value);
  }

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

  const onPasswordConfirmationChange = (event) => {
    if(event.target.value != password){
      errors.passwordConfirmation = 'Passwords must be the same';
    }else{
      errors.passwordConfirmation = null;
    }
    setPasswordConfirmation(event.target.value);
  }
  
  // Submit the form
  const onSubmitRegisterForm = (event) => {
    event.preventDefault();
    if(errors.email == null && errors.password == null && errors.name == null && errors.passwordConfirmation == null){
      startChecking();
    }
    
  }
  
  const onRegisterUser = () => {
    if(errors.email == null && errors.password == null && errors.name == null && errors.passwordConfirmation == null){
      
      const registerUserData = {
        name: name,
        email: email,
        password: password
      };
      
      startRegisterUser(registerUserData);
      
    }
  }
  
  // If register success
  useEffect(() => {

    if(registerSucessMsg != null){
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      Swal.fire('Success Registered', 'In the link that we have sent to your email, you can enter the code that we sent you to activate your account.', 'success');
      startClearingMessages();
    }

  },[registerSucessMsg]);

  // If register fail
  useEffect(() => {

    if(registerFailedMsg != null){
      Swal.fire('Register Failed', registerFailedMsg, 'error');
      startClearingMessages();
    }

  },[registerFailedMsg]);

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
            <Typography variant='h6' sx={{color: 'primary.main'}}>Create Account</Typography>
          </Grid>
          <form onSubmit={onSubmitRegisterForm}>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid
                item
                display={errors.name == null ? 'none' : 'flex'}
                sx={{
                  justifyContent: 'center',
                  width: '100%',
                  mb: 2
                }}
              >
                <Alert severity="error" sx={{width:'100%'}}>{errors.name}</Alert>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  mb:2
                }}
              >
                <TextField 
                  label="Full Name" 
                  type='text'
                  variant="outlined"
                  fullWidth
                  onChange={onNameChange}
                  value={name}
                />
              </Grid>
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
                  onClick={onRegisterUser}
                  type="submit"
                >
                  Sign Up
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
              to={'/auth/login'}
            >
              Sign In
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


