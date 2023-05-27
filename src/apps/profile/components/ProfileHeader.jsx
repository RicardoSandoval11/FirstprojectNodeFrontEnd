import { Grid, Button, Typography, Box } from "@mui/material"


export const ProfileHeader = ({user}) => {

    const baseUrl = import.meta.env.VITE_API_URL

  return (
    <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: {xs:'center', md: 'space-between'},
            flexDirection:{xs: 'column', md: 'row'},
            alignItems: 'center'
        }}
    >
        <Grid
            item
            sx={{
                display: 'flex',
                justifyContent: {xs:'center'},
                flexDirection:{xs: 'column', md: 'row'},
                width: '50%'
            }}
        >
            <Box
                component="img"
                sx={{
                    width: '50%',
                    borderRadius: '100%',
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    marginX: 'auto',
                    marginY: {xs: 2, md: 0}
                }}
                alt="User image"
                src={baseUrl+'/'+user.photo}
            />
        </Grid>
        <Grid
            item
            sx={{
                display: 'flex',
                justifyContent: {xs:'center', md: 'start'},
                flexWrap: 'wrap',
                flexDirection:{xs: 'column', md: 'row'},
                width: '50%'
            }}
        >
            <Typography
                sx={{
                    display: 'block',
                    width: '100%',
                    textAlign: {xs:'center', md: 'start'},
                    fontWeight: 600,
                    marginY: {xs: 1, md: 0}
                }}
                variant="h6"
            >
                {user.name}
            </Typography>
            <Typography
                sx={{
                    display: 'block',
                    width: '100%',
                    textAlign: {xs:'center', md: 'start'},
                    fontWeight: 600,
                    color: '#919191',
                    marginY: {xs: 1, md: 0}
                }}
                variant='body1'
            >
                { user.email }
            </Typography>
        </Grid>
    </Grid>
  )
}



