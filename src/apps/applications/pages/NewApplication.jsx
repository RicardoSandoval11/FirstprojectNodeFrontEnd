import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { AppLayout } from '../../../layout/AppLayout';
import { useApplicationStore } from '../../../hooks/useApplicationStore';

export const NewApplication = () => {

    const navigate = useNavigate();

    const { startLoading, startSendingNewApplication } = useApplicationStore();

    const { status } = useSelector( state => state.application );

    const {vacancyId} = useParams();

    const [message, setMessage] = useState('');
    const [file, setFile] = useState('');

    const onMessageChange = (event) => {
      setMessage(event.target.value);
    }

    const onFileChange = (event) => {
      setFile(event.target.files[0]);
    }

    const onSubmitForm = (event) => {
      event.preventDefault();
      if(message != '' && file != ''){
        startLoading();
      }
      
    }

    const onSendApplication = () => {
      if(message != '' && file != ''){
        const formData = new FormData();

        formData.append('vacancyId', vacancyId);
        formData.append('comment', message);
        formData.append('file', file);

        startSendingNewApplication(formData);
        setMessage('');
        setFile('');
      }else{
        Swal.fire('Fields Empty', 'All fields are required', 'warning');
      }
    }

  const { startClearingMessages } = useApplicationStore();
  const { newApplicationSuccessMsg, newApplicationFailedMsg } = useSelector( state => state.application );

  useEffect(() => {
    if(newApplicationSuccessMsg != null){
      Swal.fire('Application Send', newApplicationSuccessMsg, 'success');
      startClearingMessages();
    }
  },[newApplicationSuccessMsg]);

  useEffect(() => {
    if(newApplicationFailedMsg != null){
      Swal.fire('Application Send Failed', newApplicationFailedMsg, 'error');
      startClearingMessages();
    }
  },[newApplicationFailedMsg]);

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
          <Typography variant='h6' sx={{color: 'primary.main'}}>Apply For this Job</Typography>
        </Grid>
        <form onSubmit={onSubmitForm} action='/'>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                mb:2
              }}
            >
              <TextField
                placeholder="Send a message"
                multiline
                fullWidth
                rows={6}
                type='text'
                onChange={onMessageChange}
                value={message}
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
                component="label"
              >
                Upload Your Cv
                <input
                  type="file"
                  hidden
                  onChange={onFileChange}
                />
              </Button>
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
                onClick={onSendApplication}
                type="submit"
                disabled={status == 'loading'}
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


