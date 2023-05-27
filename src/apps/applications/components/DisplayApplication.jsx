import { Grid, Typography, Link, Box, Button } from "@mui/material";
import { formatDates } from "../../../helpers/formatDates";

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useApplicationStore } from "../../../hooks/useApplicationStore";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { useMessageStore } from "../../../hooks/useMessageStore";
import { useSelector } from "react-redux";


export const DisplayApplication = ({application, owner}) => {

  const { startRemovingApplication } = useApplicationStore();
  const { startCreatingOrSendMessage, startClearingMessages } = useMessageStore();

  const { sendMessageSuccessMsg, sendMessageFailedMsg } = useSelector( state => state.messages );

  const baseUrl = import.meta.env.VITE_API_URL;

  // hanndle remove application
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteApplication = () => {
    setOpen(false);
    startRemovingApplication(application.id);
  }

  const [openSendMessage, setOpenSendmessage] = React.useState(false);

  const handleClickOpenSendMessage = () => {
    setOpenSendmessage(true);
  };

  const handleCloseSendMessage = () => {
    setOpenSendmessage(false);
  };

  const [message, setMessage] = React.useState('');

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const onSendMessage = () => {
    if(message.trim() != ''){
      setOpenSendmessage(false);
        startCreatingOrSendMessage(message, application.user.id);
    }else{
      setOpenSendmessage(false);
      Swal.fire('Message Empty', 'Message cannot be empty', 'warning');
    }
  }

  // handle send message result
  React.useEffect(() => {
    if(sendMessageSuccessMsg != null){
      Swal.fire('Message Sent', sendMessageSuccessMsg, 'success');
      startClearingMessages();
    }
  },[sendMessageSuccessMsg]);

  React.useEffect(() => {
    if(sendMessageFailedMsg != null){
      Swal.fire('Message Sent Failed', sendMessageFailedMsg, 'error');
      startClearingMessages();
    }
  },[sendMessageFailedMsg]);


  return (
    <Grid
        container
        sx={{
            display: 'flex',
            boxShadow: 3,
            borderRadius: '10px',
            flexWrap: 'wrap',
            padding: 3,
            justifyContent: 'center',
            maxWidth: 600,
            marginX: 'auto',
            marginY: 2
        }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          width: '100%',
          mb: 2,
          justifyContent: 'center'
        }}
      >
        <Typography variant="h5">{application.vacancy.name}</Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: {xs: 'center', sm: 'start'},
          flexWrap: 'wrap',
          width:{xs: '100%', sm: '60%'}
        }}
      >
        <Typography
          sx={{
            display:'block',
            width: '100%',
            mb: 1
          }}
          variant="body2"
        >
          <b>CANDIDATE: </b>{application.user.name}
        </Typography>
        <Typography
          sx={{
            display:'block',
            width: '100%',
            mb: 1
          }}
          variant="body2"
        >
          <b>EMAIL: </b>{application.user.email}
        </Typography>
        <Typography
          sx={{
            display:'block',
            width: '100%',
            mb:1
          }}
          variant="body2"
        >
          <b>RESUME: </b><Link href={baseUrl+'/'+application.userFile} target="_blank">cv</Link>
        </Typography>
        <Typography
          sx={{
            display:'block',
            width: '100%',
            mb: 1
          }}
          variant="body2"
        >
          <b>COMMENT: </b>{application.comment}
        </Typography>
      <Typography
          sx={{
            display:'block',
            width: '100%',
            color: '#919191'
          }}
          variant="body2"
        >
          Date: {formatDates(application.createdAt)}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          width:{xs: '100%', sm: '40%'},
          height: '40%',
          marginY: 2
        }}
      >
        <Box
          component="img"
          sx={{
            width: '70%',
            maxHeight: 200,
            maxWidth: 200,
            borderRadius: '10px',
          }}
          alt='Candidate photo'
          src={baseUrl+'/'+application.user.photo}
      />
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width:'100%',
          marginY: {xs: 1, sm: 3}
        }}
      >
          {
            owner ?
              <>
                <Button 
                  variant="contained"
                  sx={{
                      backgroundColor: 'error.main',
                      mb:{xs: 1, sm: 0},
                      color: 'white',
                      marginLeft: 1,
                      '&:hover':{
                          backgroundColor: 'white',
                          color: 'error.main'
                      }
                  }}
                  onClick={handleClickOpen}
                >
                  Remove
                </Button>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Remove application for ${application.vacancy.name}`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete your application for this position?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={onDeleteApplication} autoFocus>
                    Remove
                  </Button>
                </DialogActions>
              </Dialog>
              </>
            :
              <>
                <Button variant="contained" 
                  sx={{
                    backgroundColor: '#00296c',
                    mb:{xs: 1, sm: 0},
                    color: 'white',
                    marginRight: 1,
                    '&:hover':{
                        backgroundColor: 'white',
                        color: '#00296c'
                    }
                  }}
                  onClick={handleClickOpenSendMessage}
                >
                    Send a message
                </Button>
                <Dialog open={openSendMessage} onClose={handleCloseSendMessage}>
                <DialogTitle>Send a message to the candidate</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Send a message"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onMessageChange}
                    value={message}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSendMessage}>Cancel</Button>
                  <Button onClick={onSendMessage}>Send Message</Button>
                </DialogActions>
              </Dialog>
            </>
          }
      </Grid>
    </Grid>
  )
}


