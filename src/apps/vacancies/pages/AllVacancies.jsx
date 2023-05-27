import { useState, useEffect, useCallback, useRef } from "react"
import { AppLayout } from "../../../layout/AppLayout"
import { useCategoryStore } from "../../../hooks/useCategoriesStore";
import { useSalaryStore } from "../../../hooks/useSalaryStore";
import { DisplayVacancy } from "../components/DisplayVacancy";
import { Grid, Alert, Button, TextField, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useVacancyStore } from "../../../hooks/useVacanciesStore";
import { Checking } from '../../../ui/Checking';


export const AllVacancies = () => {

    const [page, setPage] = useState(0);
    const [kword, setKword] = useState('');
    const [salaryId, setSalaryId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const onKwordChange = (event) => {
        setKword(event.target.value);
    }

    const onSalaryChange = (event) => {
        setSalaryId(event.target.value);
        setPage(0);
    }

    const onCategoryChange = (event) => {
        setCategoryId(event.target.value);
        setPage(0);
    }

    const { startLoadingAllCategories } = useCategoryStore();
    const { startLoadingAllSalaries } = useSalaryStore();
    const { startLoadingAllVacancies } = useVacancyStore();

    useEffect(() => {
        startLoadingAllCategories();
        startLoadingAllSalaries();
    },[]);

    const { allCategoriesForm } = useSelector( state => state.categories );
    const { salaries } = useSelector( state => state.salaries );

    useEffect(() => {
        startLoadingAllVacancies(page, kword, salaryId, categoryId);
    },[page, kword, salaryId, categoryId]);

    const { status, allVacancies, totalPages } = useSelector( state => state.vacancies );

    // handle openclose filter
    const [displayFilter, setDisplayFilter] = useState(false);

    const onHandleShowFilter = () => {
        setDisplayFilter(!displayFilter);
    }

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
        <Grid
            container
            sx={{
                marginY: 3,
                display: 'flex',
                justifyContent: {xs: 'center', sm: 'start'},
                maxWidth: 1400,
                marginX: 'auto'
            }}
        >
            <Button
                onClick={onHandleShowFilter}
                variant="contained"
            >
                {displayFilter? 'Hide filter' : 'Show filter'}
            </Button>
        </Grid>
        {
            allCategoriesForm == null || salaries == null ?
                <></>
            :
                displayFilter ?
                    <Grid 
                        container
                        sx={{
                            justifyContent: 'center',
                            width: '100%',
                            marginY: 3,
                            maxWidth: 1400,
                            marginX: 'auto'
                        }}

                    >
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Category"
                                onChange={onCategoryChange}
                                value={categoryId}
                            >{
                                allCategoriesForm.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                    </MenuItem>
                                ))
                            }
                            </TextField>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Salary"
                                onChange={onSalaryChange}
                                value={salaryId}
                            >{
                                salaries.map((salary) => (
                                    <MenuItem key={salary.id} value={salary.id}>
                                    {salary.value}
                                    </MenuItem>
                                ))
                            }
                            </TextField>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                id="outlined-select-currency"
                                type="text"
                                fullWidth
                                label="Name, description or details"
                                onChange={onKwordChange}
                                value={kword}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                :
                    <></>
        }
        {
        allVacancies.length == 0 && status == 'searching' ?
            <Checking/>
        :
            <>
                {
                    allVacancies.length > 0 ?
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            maxWidth: 1400,
                            marginX: 'auto'
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
                            allVacancies.map((vacancy) => {
                                return (
                                    <DisplayVacancy 
                                        vacancy={vacancy} 
                                        userVacancy={false} 
                                        key={vacancy.id}
                                    />
                                )  
                            })
                        }
                        {
                            totalPages > 1 ?
                                <Pagination/>
                            :
                                <></>
                        }
                    </Grid>
                    </Grid>
                    :
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            boxShadow: 3,
                            borderRadius: '10px',
                            height: '90vh',
                            alignItems: 'center'
                        }}
                    >
                        <Alert 
                            severity="info"
                            sx={{
                                marginY: 4
                            }}
                        >
                            No Matches Found
                        </Alert>
                    </Grid>
                }
            </>
        }
    </AppLayout>
  )
}

