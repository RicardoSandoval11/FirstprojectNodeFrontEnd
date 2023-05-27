import { useEffect, useState } from "react"
import { AppLayout } from "../../../layout/AppLayout"
import { useSelector } from "react-redux";
import { useVacancyStore } from "../../../hooks/useVacanciesStore";
import { Checking } from "../../../ui/Checking";
import { Alert, Button, Grid } from "@mui/material";
import { DisplayVacancy } from "../components/DisplayVacancy";


export const MyVacancies = () => {

    const [page, setPage] = useState(0);

    const { startLoadingMyVacancies } = useVacancyStore();

    useEffect(() => {
        startLoadingMyVacancies(page);
    },[page]);

    const { myVacancies, totalPages } = useSelector( state => state.vacancies );

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
    <>
        {
        myVacancies == null ?
            <Checking/>
        :
            <>
                {
                    myVacancies.length > 0 ?
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            boxShadow: 3,
                            borderRadius: '10px'
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
                                    myVacancies.map((vacancy) => {
                                        return (
                                            <DisplayVacancy vacancy={vacancy} userVacancy={true} key={vacancy.id}/>
                                        )
                                    })
                                }
                            </Grid>
                            <Pagination/>
                        
                    </Grid>
                    :
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            boxShadow: 3,
                            borderRadius: '10px'
                        }}
                    >
                        <Alert 
                            severity="info"
                            sx={{
                                marginY: 4
                            }}
                        >
                            You don't have vacancies yet
                        </Alert>
                    </Grid>
                }
            </>
        }
    </>
  )
}


