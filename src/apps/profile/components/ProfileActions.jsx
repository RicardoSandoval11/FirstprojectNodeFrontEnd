import { Grid, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


export const ProfileActions = () => {

    const navigate = useNavigate();

    const redirectUpdateMyInformation = () => {
        navigate(`/update-information`);
    }

    const redirectPublishVacancy = () => {

        navigate('/vacancy/add-new');

    }

  return (
    <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: {xs: 'center', md: 'start'},
            flexDirection:{xs: 'column', md: 'row'},
            marginY: {xs:2, md: 3},
            padding: 1
        }}
    >
        <Button
            variant="contained"
            size="small"
            onClick={redirectUpdateMyInformation}
            sx={{
                marginRight: {md: 1},
                marginBottom: {xs: 2, md: 0}
            }}
        >
            Update My Information
        </Button>
        <Button
            variant="contained"
            size='small'
            onClick={redirectPublishVacancy}
            sx={{
                marginLeft: {md: 1},
                marginBottom: {xs: 2, md: 0}
            }}
        >
            ¿Do You Want to Publish an Oportunity?
        </Button>
    </Grid>
  )
}