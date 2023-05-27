import { useEffect, useState } from "react"
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { AppLayout } from "../../../layout/AppLayout";

export const ActivateAccount = () => {


  const { startChecking, startVerifyingActivationCode, startClearingMessages } = useAuthStore();

  const { status, activateAccountFailedMsg } = useSelector( state => state.auth );

  const initialErrors = {
    code: null
  }

  const [errors, setErrors] = useState(initialErrors);

  const [code, setCode] = useState('');

  // on code changes
  const onChangeCode = (event) => {
    if(event.target.value.length < 19){
      errors.code = 'Invalid Code';
    }else{
      errors.code = null;
    }
    setCode(event.target.value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    if(errors.code == null){
      startChecking();
    }
  }

  const onSendActivateCode = () => {
    if(errors.code == null){
      startVerifyingActivationCode(code);
    }
  }

  // handle result
  useEffect(() => {
    if(activateAccountFailedMsg != null){
      Swal.fire('Invalid Code', activateAccountFailedMsg, 'error');
      startClearingMessages();
      
    }
  },[activateAccountFailedMsg]);


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
            <Typography variant='h6' sx={{color: 'primary.main'}}>Activate Account</Typography>
          </Grid>
          <form onSubmit={onSubmitForm}>
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid
                item
                display={errors.code == null ? 'none' : 'flex'}
                sx={{
                  justifyContent: 'center',
                  width: '100%',
                  mb: 2
                }}
              >
                <Alert severity="error" sx={{width:'100%'}}>{errors.code}</Alert>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  marginY:2
                }}
              >
                <TextField 
                  label="Code" 
                  type='text'
                  variant="outlined"
                  fullWidth
                  onChange={onChangeCode}
                  value={code}
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
                  onClick={onSendActivateCode}
                  disabled={status == 'checking'}
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AppLayout>
  )
}


