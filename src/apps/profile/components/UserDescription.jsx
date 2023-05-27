import { Grid, Typography } from "@mui/material";
import parse from 'html-react-parser';

export const UserDescription = ({user}) => {

  return (
    <Grid
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: 2,
            padding: 3
        }}
    >
      <Typography variant="h3" 
        sx={{
          display: 'block', 
          width: '100%',
          textAlign: 'center'
        }}
      >
        About Yourself
      </Typography>
      <Grid
        sx={{
          width: '100%',
          marginY: 2,
          textAlign: 'center'
        }}
      >
        {parse(user.description != null ? user.description : '')}
      </Grid>
    </Grid>
  )
}

