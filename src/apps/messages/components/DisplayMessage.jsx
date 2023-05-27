import { Grid, Typography } from "@mui/material"
import { formatDates } from "../../../helpers/formatDates"


export const DisplayMessage = ({message}) => {
  return (
    <Grid
        container
        sx={{
            display: 'flex',
            width: '100%',
            marginY: 2,
            justifyContent: message.receiverId== localStorage.getItem('userId') ? 'start' : 'end' 
        }}
    >
      <Grid
        item
        sx={{
            display: 'flex',
            width: '50%',
            marginY: 2,
            borderRadius: '15px',
            backgroundColor: '#f28395',
            color: "white",
            flexWrap: 'wrap',
            padding: 2
        }}
      >
        <Grid sx={{width: '100%'}}>{message.message}</Grid>
        <Grid sx={{width: '100%', color: '#F7F7F7'}}>{formatDates(message.createdAt)}</Grid>
      </Grid>
    </Grid>
  )
}

