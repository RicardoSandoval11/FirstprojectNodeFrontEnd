import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCategoryStore } from '../../../hooks/useCategoriesStore';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DisplayCategory } from '../../categories/components/DisplayCategory';

export const MostPopularCategories = () => {

    const { startLoadingMostPopularCategories } = useCategoryStore();

    useEffect(() => {
        startLoadingMostPopularCategories();
    },[]);

    const {categoriesWithMoreVacancies} = useSelector( state => state.categories );

  return (
    <>
        {
            categoriesWithMoreVacancies != null ?
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
                        <Typography variant='h4'>Categories with more opportunities</Typography>
                    </Grid>
                    {
                        categoriesWithMoreVacancies.map((category) => (
                            <DisplayCategory category={category} key={category.id}/>
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
                    }}>
                    <CircularProgress />
                </Grid>
        }
    </>
  )
}

