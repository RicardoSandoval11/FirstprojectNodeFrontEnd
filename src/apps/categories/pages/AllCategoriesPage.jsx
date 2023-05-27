import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../hooks/useCategoriesStore"
import { AppLayout } from "../../../layout/AppLayout"
import { useSelector } from "react-redux";
import { Checking } from "../../../ui/Checking";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { DisplayCategory } from "../components/DisplayCategory";


export const AllCategoriesPage = () => {

    const { startLoadingCategories } = useCategoryStore();

    const [kword, setKword] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingCategories(page, kword);
    },[kword, page]);

    const { allCategories, status, totalPages } = useSelector( state => state.categories );

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

    const onKwordChange = (event) => {
        setKword(event.target.value);
    }

  return (
    <AppLayout>
      {
        allCategories == null || status == 'searching'?
            <Checking/>
        :
        <>
            <Grid
                container
                sx={{
                    display: 'flex',
                    boxShadow: 3,
                    borderRadius: '10px',
                    maxWidth: 1200,
                    marginX: 'auto'
                }}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid
                    item
                    sx={{
                        marginX: 2,
                        marginY: 2,
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: {xs: 'center', lg: 'start'}
                    }}
                >
                    <Typography
                        sx={{
                            display: 'block',
                            width: {xs: '100%', md: '20%'},
                            marginY: 2,
                            fontWeight: 600
                        }}
                        variant="h5"
                    >
                        Filter Results:
                    </Typography>
                    <TextField
                        label='Name or description'
                        variant="outlined"
                        onChange={onKwordChange}
                        value={kword}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: {xs: 'center', lg: 'space-between'},
                        flexWrap: 'wrap',
                        marginX: 2
                    }}
                >
                    {
                        allCategories.map((category) => {
                            return (
                                <DisplayCategory category={category} key={category.id}/>
                            )
                        })
                    }
                </Grid>
                {
                    totalPages > 1 ?
                        <Pagination/>
                    :
                        <></>
                }
                
            </Grid>
        </>
      }
    </AppLayout>
  )
}


