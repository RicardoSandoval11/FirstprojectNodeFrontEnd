import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#5958af'
        },
        secondary: {
            main: '#9b91fa'
        },
        error: {
            main: red.A400
        }
    }
})