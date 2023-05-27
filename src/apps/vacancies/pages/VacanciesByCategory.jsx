import { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import { useSelector } from "react-redux";
import { Checking } from "../../../ui/Checking";
import { Grid, Button, Alert } from "@mui/material";
import { useVacancyStore } from "../../../hooks/useVacanciesStore";
import { DisplayVacancy } from "../components/DisplayVacancy";
import { useNavigate, useParams } from "react-router-dom";


export const VacanciesByCategory = () => {

    const navigate = useNavigate();

    const { categoryId } = useParams();

    const { startloadingVacanciesByCategory, startClearingMessages } = useVacancyStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startloadingVacanciesByCategory(categoryId, page);
    },[page]);

    const { 
            vacanciesByCategory, 
            status, 
            totalPages,
            loadVacanciesByCategoryFailedMsg } = useSelector( state => state.vacancies );

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

    useEffect(() => {
        if(loadVacanciesByCategoryFailedMsg != null){
            startClearingMessages();
            navigate('/');
        }
    },[loadVacanciesByCategoryFailedMsg]);

  return (
    <AppLayout>
      {
        vacanciesByCategory == null || status == 'searching'?
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
                    marginX: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    vacanciesByCategory.length < 1 ?
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                justifyContent: {xs: 'center', lg: 'space-between'},
                                flexWrap: 'wrap',
                                height: '90vh',
                                alignItems: 'center',
                                marginX: 2
                            }}
                        >
                            <Alert severity='info'>There are not vacancies for this category.</Alert>
                        </Grid>
                    :
                        <>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    justifyContent: {xs: 'center', lg: 'space-between'},
                                    flexWrap: 'wrap',
                                    alignItems: 'start',
                                    marginX: 2
                                }}
                            >
                                {
                                    vacanciesByCategory.map((vacancy) => {
                                        return (
                                            <DisplayVacancy vacancy={vacancy} key={vacancy.id}/>
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
                        </>
                }
                
            </Grid>
        </>
      }
    </AppLayout>
  )
}


