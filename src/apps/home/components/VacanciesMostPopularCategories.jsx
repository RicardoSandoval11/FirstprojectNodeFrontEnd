import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useVacancyStore } from '../../../hooks/useVacanciesStore';
import { DisplayVacancy } from '../../vacancies/components/DisplayVacancy';

export const VacanciesOfPopularCategories = () => {

    const { startLoadingVacanciesOfPopularCategories } = useVacancyStore();

    useEffect(() => {
        startLoadingVacanciesOfPopularCategories();
    },[]);

    const {vacanciesOfPopularCategories} = useSelector( state => state.vacancies );

  return (
    <>
        {
            vacanciesOfPopularCategories != null ?
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: {xs: 'center', lg: 'space-between'},
                        flexWrap: 'wrap',
                        margin: 2,
                        padding: 1,
                        maxWidth: 1600
                    }}
                >
                    <Grid 
                        sx={{
                            display: 'flex',
                            justifyContent:{xs:'center', md: 'start'},
                            width: '100%',
                            padding: 3,
                            margin: 1
                        }}
                    >
                        <Typography variant='h4'>Find a job</Typography>
                    </Grid>
                    {
                        vacanciesOfPopularCategories.map((vacancy) => (
                            <DisplayVacancy vacancy={vacancy} key={vacancy.id} userVacancy={false}/>
                        ))
                    }
                </Grid>
            :
                <Grid 
                    sx={{ 
                        display: 'flex', 
                        minHeight: 300, 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        width: '100%',
                        marginY: 4 
                    }}
                >
                    <CircularProgress />
                </Grid>
        }
    </>
  )
}
