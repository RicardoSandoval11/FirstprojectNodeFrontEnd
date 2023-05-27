import { useEffect, useState } from 'react';

import { AddCircle } from '@mui/icons-material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Grid, Typography, TextField, Fab, Alert, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { AppLayout } from '../../../layout/AppLayout';
import { Checking } from '../../../ui/Checking';
import { useUserStore } from '../../../hooks/useUserStore';
import { useSelector } from 'react-redux';
import { specialCharvalidation } from '../../../helpers/specialCharvalidation';

export const UpdateMyInformation = () => {

    const navigate = useNavigate();

    const { 
            startLoadingUserInformation, 
            startLoading, 
            startupdateMyInformation } = useUserStore();

    useEffect(() => {
        startLoadingUserInformation();
    },[]);

    const { userDetails, status } = useSelector( state => state.user );

    const [name, setName] = useState('');

    useEffect(() => {
        if(userDetails.name != undefined){
            if(userDetails.name != email){
                setName(userDetails.name);
            }
        }
    },[userDetails]);

    const [email, setEmail] = useState('');

    useEffect(() => {
        if(userDetails.email != undefined){
            if(userDetails.email != email){
                setEmail(userDetails.email);
            }
        }
    },[userDetails]);

    const [description, setDescription] = useState('');

    useEffect(() => {
        if(userDetails.description != undefined){
            if(userDetails.description != description){
                setDescription(userDetails.description);
            }
        }
    },[userDetails]);


    const [image, setImage] = useState('');
    
    const onNameChange = (event) => {
        if(specialCharvalidation(event.target.value)){
            errors.name = 'Name cannot contain special characters';
        }else if(event.target.value.length < 1){
            errors.name = 'Name cannot be empty';
        }else{
            errors.name = null;
        }
        setName(event.target.value);
    }

    const onDescriptionChange = (event, editor) => {
        setDescription(editor.getData());
    }

    const initialErrors = {
        name: null, 
        email: null
    }

    const [errors, setErrors] = useState(initialErrors);

    const onEmailChange = (event) => {
        if(!event.target.value.includes('@')){
            errors.email = 'Email must contain the symbol @';
        }else if(!event.target.value.includes('.')){
            errors.email = 'Email must have a valid domain';
        }else if(event.target.value.length < 1){
            errors.email = 'Email cannot be empty';
        }else {
            errors.email = null;
        }
        setEmail(event.target.value);
    }

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        if(
            errors.name == null &&
            errors.email == null &&
            description != ''
        ){
            startLoading();
        }
    }

    const onUpdateMyInformation = () => {
        if(
            errors.name == null &&
            errors.email == null &&
            description != ''
        ){
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('description', description);
                if(image != ''){
                    formData.append('photo', image);
                }
                startupdateMyInformation(formData)
                navigate('/my-profile');   
        }else{
            Swal.fire('Fields Empty', 'Fields cannot be empty', 'warning');
        }
    }

  return (
    <AppLayout>
      <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 1400,
            marginX: 'auto',
            height: '100vh',
            alignItems: 'center'
        }}
      >
        {
            userDetails == null ?
                <Checking/>
            :
                <Grid
                    container
                    sx={{
                        padding: 2,
                        boxShadow: 3,
                        borderRadius: '10px',
                        maxWidth: 800
                    }}
                    className='animate__animated animate__faster animate__bounceIn'
                >
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginY: 2,
                            width: '100%'
                        }}
                    >
                        <Typography variant='h5' sx={{fontWeight: 600}}>Update my information</Typography>
                    </Grid>
                    <form onSubmit={onSubmitForm}>
                        <Grid
                            container
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                            }}
                        >
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                            display={errors.name == null ? 'none': ''}
                        >
                            <Alert severity='error'>{errors.name}</Alert>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                label = 'Name'
                                type= 'text'
                                size="small"
                                placeholder='Name of the position'
                                fullWidth
                                name='name'
                                onChange={onNameChange}
                                value={name}
                            />
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                            display={errors.email == null ? 'none': ''}
                        >
                            <Alert severity='error'>{errors.email}</Alert>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                label = 'Email'
                                type= 'text'
                                size="small"
                                placeholder='Email'
                                fullWidth
                                name='email'
                                onChange={onEmailChange}
                                value={email}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                padding: 2,
                                mb: 2,
                                width: '100%'
                            }}
                        >
                            <Typography sx={{display: 'block', marginY: 2, padding: 1, fontWeight: 600}} variant='body1'>Describe yourself</Typography>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={description}
                                onChange={onDescriptionChange}
                            />
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                width:{xs:'100%',md:'30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={onImageChange}
                                />
                                    <Fab
                                        color="secondary"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="extended"
                                    >
                                    <AddCircle /> Profile picture
                                    </Fab>
                            </label>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                marginY: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                        >
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={status == 'searching'}
                                onClick={onUpdateMyInformation}
                            >
                                Update
                            </Button>
                        </Grid>
                        </Grid>
                    </form>
                </Grid>
        }
      </Grid>
    </AppLayout>
  )
}

