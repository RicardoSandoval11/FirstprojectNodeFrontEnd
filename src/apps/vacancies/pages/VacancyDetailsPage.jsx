import { useEffect } from 'react';


import { Grid, Typography, Box, Button, Alert } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

import { AppLayout } from "../../../layout/AppLayout";
import { Checking } from '../../../ui/Checking';
import { formatDates } from '../../../helpers/formatDates';
import { useVacancyStore } from '../../../hooks/useVacanciesStore';

export const VacancyDetailsPage = () => {

    const baseUrl = import.meta.env.VITE_API_URL;

    const { vacancyId } = useParams();

    const { startLoadingVacancyDetails } = useVacancyStore();

    useEffect(() => {
        startLoadingVacancyDetails(vacancyId);
    },[]);

    const { vacancyDetails } = useSelector( state => state.vacancies );
    const { status } = useSelector( state => state.auth );

    const navigate = useNavigate();

    const redirectApplicationFormPage = () => {
        navigate(`/application/new-application/${vacancyDetails.id}`);
    }
    
    const redirectApplicationsByJob = () => {

    }


  return (
    <AppLayout>
        {
            vacancyDetails != null ? 
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginY: 4
                    }}
                    className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            textAlign:'center',
                            width: {xs: '100%', md:'50%'},
                        }}
                    >
                        <Grid
                            item 
                            sx={{ 
                                m:2, 
                                display:'flex', 
                                justifyContent: 'center',
                                width: '100%' 
                            }}
                        >
                            <Box
                            component="img"
                            sx={{
                            width: '70%',
                            maxWidth: { xs: 300 },
                            maxHeight: 300,
                            borderRadius: '10px'
                            }}
                            alt={vacancyDetails.title}
                            src={baseUrl+'/'+vacancyDetails.image}
                        />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            textAlign:'start',
                            width: {xs: '100%', md:'50%'},
                            padding: 3
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Typography variant='h5'>{vacancyDetails.name}</Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Link  
                                style={{
                                    color: '#919191', 
                                    textDecoration: 'none'
                            }}
                                to={`/vacancy/vacancies-by-category/${vacancyDetails.categoryId}`}
                            >
                                {vacancyDetails.category.name}
                            </Link>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Typography  
                                variant='subtitle1'
                                sx={{
                                    color: '#919191'
                            }}
                                
                            >
                                Published {formatDates(vacancyDetails.createdAt)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Typography  
                                variant='subtitle1'
                                sx={{
                                    color: '#919191'
                            }}
                                
                            >
                                Last Update {formatDates(vacancyDetails.updatedAt)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <Typography  
                                variant='subtitle1'
                                sx={{
                                    color: '#919191'
                            }}
                                
                            >
                                Salary {vacancyDetails.salary.value}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%'
                            }}
                        >
                            <Typography  
                                variant='h6'
                                sx={{
                                    color: '#000',
                                    display: 'block',
                                    width: '100%'
                                }}  
                            >
                                About the job
                            </Typography>
                            <Grid
                                item
                                sx={{
                                    width: '100%',
                                    textAlign: 'start'
                                }}
                            >
                                {parse(vacancyDetails.details)}
                            </Grid>
                        </Grid>
                        {
                            status == 'authenticated'?
                                vacancyDetails.createdBy != localStorage.getItem('userId') ?
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Button
                                            variant='contained'
                                            sx={{
                                                backgroundColor: '#00296c',
                                                color: 'white',
                                                '&:hover':{
                                                    backgroundColor: 'white',
                                                    color: '#00296c'
                                                }
                                            }}
                                            onClick={redirectApplicationFormPage}
                                        >
                                            Apply for this job
                                        </Button>
                                    </Grid>
                                :
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Link
                                            style={{
                                                color: '#00296c',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                            }}
                                            to={`/application/applications-by-job/${vacancyDetails.id}`}
                                        >
                                            Check who has applied for this position
                                        </Link>
                                    </Grid>
                            :
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                <Alert
                                    severity='info'
                                >
                                    Create an account to apply for this position
                                </Alert>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            :
                <Checking/>

        }
    </AppLayout>
  )
}


