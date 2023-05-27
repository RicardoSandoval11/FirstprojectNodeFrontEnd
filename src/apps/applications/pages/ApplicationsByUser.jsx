import { Grid, Button, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppLayout } from '../../../layout/AppLayout';
import { useApplicationStore } from '../../../hooks/useApplicationStore';
import { Checking } from '../../../ui/Checking';
import { DisplayApplication } from '../components/DisplayApplication';
import Swal from 'sweetalert2';

export const ApplicationsByUser = () => {

    const { startLoadingApplicationsByUser, startClearingMessages } = useApplicationStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingApplicationsByUser(page);
    },[page]);

    const { 
            applicationsByUser, 
            totalPages, 
            status, 
            removeApplicationSuccessMsg, 
            removeApplicationFailedMsg } = useSelector( state => state.application );

    const Pagination = () => {

        const onPressPage = (event) => {
            setPage(event.target.innerHTML.slice(0,1)-1);
        }

        const pages = [];

        for (let page = 0; page < totalPages; page++) {
            pages.push(page);
            
        }

        return (
            <Grid
                item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginY: 2
                }}
            >
                {
                    pages.map(Page => {
                    return (
                            <Button
                                variant='contained'
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'primary.main',
                                    marginX:1
                                }}
                                onClick={onPressPage}
                                disabled={Page == page}
                                key={Page}
                            >
                                {Page+1}
                            </Button>
                    )})     
                }
            </Grid>
        )
    }

    // handle remove messages
    useEffect(() => {
        if(removeApplicationSuccessMsg != null){
            Swal.fire('Application Removed', removeApplicationSuccessMsg, 'success');
            startClearingMessages();
        }
    },[removeApplicationSuccessMsg]);

    useEffect(() => {
        if(removeApplicationFailedMsg != null){
            Swal.fire('Application Remove Failed', removeApplicationFailedMsg, 'error');
            startClearingMessages();
        }
    },[removeApplicationFailedMsg]);

  return (
    <AppLayout>
        {
            applicationsByUser == null || status == 'checking' || totalPages == null ?
                <Checking/>
            :
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: {xs: 'center', md: 'space-between'},
                            flexWrap: 'wrap',
                            marginX: 2
                        }}
                    >
                        {
                            applicationsByUser.length > 0 ?
                                applicationsByUser.map((application) => (
                                    <DisplayApplication 
                                        key={application.id} 
                                        application={application}
                                        owner={true}
                                    />
                                ))
                            :
                                <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '100vh',
                                    alignItems: 'center'
                                }}
                                >
                                    <Alert severity='info'>You have not applied for a job yet</Alert>
                                </Grid>
                        }
                    </Grid>
                    {
                        totalPages > 1 ?
                            <Pagination/>
                        :
                            <></>
                    }
                </Grid>
        }
    </AppLayout>
  )
}

