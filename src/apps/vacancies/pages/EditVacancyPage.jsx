import { useEffect, useState } from 'react';

import { AddCircle, FourGMobiledataSharp } from '@mui/icons-material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Grid, Typography, TextField, Fab, MenuItem, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppLayout } from '../../../layout/AppLayout';
import { Checking } from '../../../ui/Checking';
import { useCategoryStore } from '../../../hooks/useCategoriesStore';
import { useSalaryStore } from '../../../hooks/useSalaryStore';
import { useStatusStore } from '../../../hooks/useStatusStore';
import { useVacancyStore } from '../../../hooks/useVacanciesStore';

export const EditVacancyPage = () => {

    const navigate = useNavigate();

    const { vacancyId } = useParams();

    const { startLoadingAllCategories } = useCategoryStore();
    const { startLoadingAllSalaries } = useSalaryStore();
    const { startLoadingAllStatus } = useStatusStore();
    const { startLoading, startLoadingVacancyDetails, startEditingVacancy } = useVacancyStore();

    const { allCategoriesForm, status:categoriesStatus } = useSelector( state => state.categories );
    const { salaries, status:salariesStatus } = useSelector( state => state.salaries );
    const { statuses, status:statusesStatus } = useSelector( state => state.statuses );
    const { status, vacancyDetails } = useSelector( state => state.vacancies );

    useEffect(() => {
        startLoadingAllCategories();
        startLoadingAllSalaries();
        startLoadingAllStatus();
        startLoadingVacancyDetails(vacancyId);
    },[]);

    const [name, setName] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.name != name){
                setName(vacancyDetails.name);
            }
        }
    },[vacancyDetails]);

    const [description, setDescription] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.description != name){
                setDescription(vacancyDetails.description);
            }
        }
    },[vacancyDetails]);

    const [details, setDetails] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.details != name){
                setDetails(vacancyDetails.details);
            }
        }
    },[vacancyDetails]);

    const [category, setCategory] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.category.id != category){
                setCategory(vacancyDetails.category.id);
            }
        }
    },[vacancyDetails]);

    const [salary, setSalary] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.salary.id != salary){
                setSalary(vacancyDetails.salary.id);
            }
        }
    },[vacancyDetails]);

    const [positionStatus, setPositionStatus] = useState('');

    useEffect(() => {
        if(vacancyDetails != null){
            if(vacancyDetails.statusId != positionStatus){
                setPositionStatus(vacancyDetails.statusId);
            }
        }
    },[vacancyDetails]);

    const [image, setImage] = useState('');
    
    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const onDetailsChange = (event, editor) => {
        setDetails(editor.getData());
    }

    const onCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const onSalaryChange = (event) => {
        setSalary(event.target.value);
    }

    const onStatusChange = (event) => {
        setPositionStatus(event.target.value);
    }

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        if(
            name != '' &&
            description != '' &&
            details != '' &&
            category != '' &&
            salary != '' &&
            positionStatus != ''
        ){
            startLoading();
        }
    }

    const onUpdateVacancy = () => {
        if(
            name != '' &&
            description != '' &&
            details != '' &&
            category != '' &&
            salary != '' &&
            positionStatus != ''
        ){
            const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('details', details);
                formData.append('categoryId', category);
                formData.append('salaryId', salary);
                formData.append('statusId', positionStatus);
                if(image != ''){
                    formData.append('image', image);
                }

                startEditingVacancy(formData, vacancyId);

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
            salariesStatus == 'searching' || 
            categoriesStatus == 'searching' || 
            statusesStatus == 'searching' ?
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
                        <Typography variant='h5' sx={{fontWeight: 600}}>Update Vacancy</Typography>
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
                                width:{xs:'100%', sm: '47%'},
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
                                width:{xs:'100%', sm: '47%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                label = 'Description'
                                type= 'text'
                                size="small"
                                placeholder='Brief description'
                                fullWidth
                                name='description'
                                onChange={onDescriptionChange}
                                value={description}
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
                            <Typography sx={{display: 'block', marginY: 2, padding: 1, fontWeight: 600}} variant='body1'>Details of the position</Typography>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={details}
                                onChange={onDetailsChange}
                            />
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
                                label="Category"
                                onChange={onCategoryChange}
                                value={category}
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
                                value={salary}
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
                                select
                                fullWidth
                                label="Status"
                                onChange={onStatusChange}
                                value={positionStatus}
                            >{
                                statuses.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                    {status.name}
                                    </MenuItem>
                                ))
                            }
                            </TextField>
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
                                    <AddCircle /> Company Logo
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
                                disabled={status == 'loading'}
                                onClick={onUpdateVacancy}
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

