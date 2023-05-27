import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import CategoryIcon from '@mui/icons-material/Category';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon from '@mui/icons-material/Face';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthStore } from '../hooks/useAuthStore';
import { useSelector } from 'react-redux';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const AppLayout = ({ children }) => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const { startLogout } = useAuthStore();
  const { status } = useSelector( state => state.auth );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Menu link

  const redirectMyMessages = () => {
    navigate('/messages/my-conversations');
  }

  const redirectMyApplications = () => {
    navigate('/application/applications-by-user');
  }

  const redirectCategories = () => {
    navigate('/categories/all-categories');
  }

  const redirectListJobs = () => {
    navigate('/vacancy/all');
  } 

  const redirectLogin = () => {
    navigate('/auth/login');
  }

  const redirectCreateAccount = () => {
    navigate('/auth/register');
  }

  const redirectMyProfile = () => {
    navigate('/my-profile');
  }

  const redirectLogout = () => {
    startLogout();
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <RouterLink 
            variant="h6"  
            component="div" 
            to={'/'} 
            style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            Jobs App
          </RouterLink>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          status == 'authenticated'?
            <>
              <List>
                  <ListItem key={'messages'} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={redirectMyMessages}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Messages'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={'applications'} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={redirectMyApplications}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <AppsIcon />
                      </ListItemIcon>
                      <ListItemText primary={'My Applications'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
              </List>
              <Divider />
            </>
          :
            <></>
        }
        <List>
        <ListItem key={'categories'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={redirectCategories}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon /> 
                </ListItemIcon>
                <ListItemText primary={'Categories'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'find-job'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={redirectListJobs}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <WorkIcon /> 
                </ListItemIcon>
                <ListItemText primary={'Find a Job'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
          {/* Not authenticated */}
          {
            status == 'authenticated' ?
              <>
                <ListItem key={'my-profile'} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={redirectMyProfile}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <FaceIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={'Profile'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={'logout'} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={redirectLogout}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <ExitToAppIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </>
            :
              <>
                <ListItem key={'login'} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={redirectLogin}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LoginIcon/> 
                    </ListItemIcon>
                    <ListItemText primary={'Login'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={'create-account'} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={redirectCreateAccount}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <AccountCircleIcon /> 
                    </ListItemIcon>
                    <ListItemText primary={'Create Account'} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              </>
          } 
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
            { children }
      </Box>
    </Box>
  );
}