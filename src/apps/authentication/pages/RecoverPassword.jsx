import { useEffect, useState } from "react";

import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { AppLayout } from "../../../layout/AppLayout"
import { useAuthStore } from "../../../hooks/useAuthStore";


export const RecoverPassword = () => {

  const { startRequestUpdatePassword, startChecking, startClearingMessages } = useAuthStore();

  const { status,recoverPasswordSuccessRequestMsg, recoverPasswordFailedRequestMsg } = useSelector( state => state.auth );

  // Form validation
  const initialErrors = {
    email: null
  };

  const [email, setEmail] = useState('');

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

  // Submit the form
  const onSubmitRecoverpasswordForm = (event) => {
    event.preventDefault();
    if(errors.email == null){
      startChecking();
    }

  }

  const onSendingRecoverpassEmail = () => {
    if(errors.email == null){
      startRequestUpdatePassword(email);
    }
  }

  useEffect(() => {
    if(recoverPasswordSuccessRequestMsg != null){
      Swal.fire('Link Sent', recoverPasswordSuccessRequestMsg, 'success');
      startClearingMessages();
      setEmail('');
    }
  },[recoverPasswordSuccessRequestMsg]);

  useEffect(() => {
    if(recoverPasswordFailedRequestMsg != null){
      Swal.fire('Send Link Failed', recoverPasswordFailedRequestMsg, 'error');
      startClearingMessages();
    }
  },[recoverPasswordFailedRequestMsg]);


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
            <Typography variant='h6' sx={{color: 'primary.main'}}>Recover Password</Typography>
          </Grid>
          <form onSubmit={onSubmitRecoverpasswordForm}>
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
                  marginY:2
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
                xs={12}
                sx={{
                  mb:2,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  variant="contained"
                  onClick={onSendingRecoverpassEmail}
                  disabled={status == 'checking'}
                  type="submit"
                >
                  Send Link
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AppLayout>
  )
}


