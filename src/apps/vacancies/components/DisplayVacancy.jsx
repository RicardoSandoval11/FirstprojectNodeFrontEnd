import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { formatDates } from '../../../helpers/formatDates';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useVacancyStore } from '../../../hooks/useVacanciesStore';

export const DisplayVacancy = ({vacancy, userVacancy}) => {

    const { startClearingMessages, startDeletingVacancy } = useVacancyStore();

    const { deleteVacancyMsg, deleteVacancyFailedMsg } = useSelector( state => state.vacancies );

    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    const onEditVacancy = () => {
        navigate(`/vacancy/edit/${vacancy.id}`);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteVacancy = () => {+
        setOpen(false);
        startDeletingVacancy(vacancy.id);
    }

    React.useEffect(() => {
        if(deleteVacancyMsg != null){
            Swal.fire('Vacancy Removed',deleteVacancyMsg, 'success');
            startClearingMessages();
        }
    },[deleteVacancyMsg]);

    React.useEffect(() => {
        if(deleteVacancyFailedMsg != null){
            Swal.fire('Vacancy Removed Failed',deleteVacancyFailedMsg, 'error');
            startClearingMessages();
        }
    },[deleteVacancyFailedMsg]);


  return (
    <Card sx={{ maxWidth: 350, margin: 1, minWidth: 350 }}>
      <CardHeader
        title={vacancy.name}
        subheader={formatDates(vacancy.updatedAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image={baseUrl +'/'+vacancy.image}
        alt="Company logo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {vacancy.description}
        </Typography>
      </CardContent>
        {
            userVacancy ?
                <CardActions disableSpacing sx={{display: 'flex', flexWrap: 'wrap'}}>
                    <IconButton aria-label="edit vacancy" onClick={onEditVacancy}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete vacancy" onClick={handleClickOpen}>
                        <DeleteIcon />
                    </IconButton>
                    <Link
                        style={{
                            color: '#00296c',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'end',
                            width: '100%',
                            marginTop: 3
                        }}
                        to={`/application/applications-by-job/${vacancy.id}`}
                    >
                        Applications
                    </Link>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {`Do you want to remove this vacancy`}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`After you have eliminated the vacancy ${vacancy.name} you will not be able to recover it`}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDeleteVacancy} autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            :
            <CardActions disableSpacing>
                <Link
                    to={`/vacancy/details/${vacancy.id}`}
                    style={{
                        textDecoration: 'none',
                        color: '#919191',
                        display: 'block',
                        padding: 2,
                        margin: 2
                    }}
                >
                    View Details
                </Link>
            </CardActions>
        }
    </Card>
  );
}