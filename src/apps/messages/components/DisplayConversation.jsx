import { Grid } from "@mui/material"
import { Link } from "react-router-dom";
import { formatDates } from "../../../helpers/formatDates";


export const DisplayConversation = ({conversation}) => {
    
  return (
    <Grid
        item
        sx={{
            display: 'flex',
            justifyContent: 'center',
            boxShadow: 3,
            borderRadius: '10px',
            flexWrap: 'wrap',
            padding: 2,
            marginY: 2,
            maxWidth: 800
        }}
    >
      <Grid
        item
        sx={{
            display: 'flex',
            width: '100%',
            color: '#919191',
            fontWeight: 600,
            mb: 1
        }}
      >
        {`Sender: ${conversation.user1User.id == localStorage.getItem('userId') ? conversation.user2User.name : conversation.user1User.name}`}
    </Grid>
      <Grid
        item
        sx={{
            display: 'flex',
            width: '100%',
            color: '#919191',
            mb: 1
        }}
      >
        {`Email: ${conversation.user1User.id == localStorage.getItem('userId') ? conversation.user2User.email : conversation.user1User.email}`}
    </Grid>
    <Grid
        item
        sx={{
            display: 'flex',
            width: '100%',
            fontWeight: 600
        }}
      >
        {`Last message sent: ${formatDates(conversation.updatedAt)}`}
    </Grid>
    
    <Grid
        item
        sx={{
            display: 'flex',
            width: '100%',
            fontWeight: 600,
            mt: 2
        }}
      >
        <Link
            style={{
                display: 'block',
                width: '100%',
                textDecoration: 'none',
                color: 'primary.main',
                marginY: 2
            }}
            to={`/messages/conversation/${conversation.id}`}
        >
            Open Conversation
        </Link>
    </Grid>
    </Grid>
  )
}

