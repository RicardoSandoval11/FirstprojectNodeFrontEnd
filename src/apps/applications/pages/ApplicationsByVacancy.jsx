import { Grid, Button, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppLayout } from '../../../layout/AppLayout';
import { useApplicationStore } from '../../../hooks/useApplicationStore';
import { Checking } from '../../../ui/Checking';
import { DisplayApplication } from '../components/DisplayApplication';

export const ApplicationsByVacancy = () => {

    const { vacancyId } = useParams();

    const navigate = useNavigate();

    const { startLoadingApplicationsByVacancy, startClearingMessages } = useApplicationStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingApplicationsByVacancy(vacancyId, page);
    },[page]);

    const { applicationsByVacancy, totalPages, status, loadApplicationsByVacancyFailedMsg } = useSelector( state => state.application );

    useEffect(() => {
        if(loadApplicationsByVacancyFailedMsg != null){
            startClearingMessages();
            navigate('/');
        }
    },[loadApplicationsByVacancyFailedMsg]);

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


  return (
    <AppLayout>
        {
            applicationsByVacancy == null || status == 'checking' || totalPages == null ?
                <Checking/>
            :
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
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
                            applicationsByVacancy.length > 0 ?
                                applicationsByVacancy.map((application) => (
                                    <DisplayApplication 
                                        key={application.id} 
                                        application={application}
                                        owner={false}
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
                                    <Alert severity='info'>There are not applications for this vacancy</Alert>
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

