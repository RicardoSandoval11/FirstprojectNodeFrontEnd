import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export const Checking = () => {
  return (
    <Grid sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Grid>
  )
}