import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Workspace from '../pages/Workspace/Workspace';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Workspace from "./components/pages/Workspace/Workspace";
import Tiles from "../pages/Tiles/Tiles";
import Report from "../pages/Report/Report";
import { MsalProvider } from "@azure/msal-react";
import { authenticateToken, getAllReports, getMyOrgWorkspaces, isTokenExpired, login } from "../../utils";
import BasicModal from "../MultiActionAreaCard";
import MultiActionAreaCard from "../MultiActionAreaCard";
import LoginScreen from "../pages/Login Screen/LoginScreen";
// import { useDispatch, useSelector } from "react-redux"
import { addAllReportsData, updateReports } from "../../features/reports/reportSlice";
import { updateSelWorkspace, updateWorkspaces } from "../../features/workspaces/workspaceSlice";
// import MiniDrawer from "./Drawer";

const drawerWidth = 240;
let accessToken = sessionStorage.getItem("access_token");
let embedUrl = "";
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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { instance, accounts, inProgress } = useMsal();
  const [tokenState, setTokenState] = useState({ accessToken: "", embedUrl: "", error: [] });
  const [isAuthenticated, setAuthenticated] = useState(accounts?.length > 0 ? true : false)
  const [workspaces, setWorkspaces] = useState([])
  const dispatch = useDispatch()
  const reports = useSelector((state) => state.reportReducer.allReportsData)

  useEffect(() => {
    if (isTokenExpired()) {
      // setTokenStatus(true)
    }
  }, []);


  const handleLogin = async () => {
    if (sessionStorage.getItem("access_token")) {
      setAuthenticated(true)
    }
    await authenticateToken(instance, accounts, inProgress, tokenState);
  }

  useEffect(() => {
    if (accounts.length > 0) {
      setAuthenticated(true)
    }
    if (accessToken == null) {
      authenticateToken(instance, accounts, inProgress, tokenState);
    } else {
      fetchWorkspaces();
    }


  }, [])


  useEffect(() => {
    if (sessionStorage.getItem("access_token") && !isAuthenticated) {
      setAuthenticated(true)
      if (workspaces.length == 0) {
        fetchWorkspaces();
      }
    }
  }, accessToken)


  async function fetchWorkspaces() {
    try {
      const res = await getMyOrgWorkspaces();
      console.log("outside this function")

      setWorkspaces(res)

      dispatch(updateSelWorkspace(res))
      dispatch(updateWorkspaces(res))
      console.log("inside this function")
      await fetchAllReports(res)
        .then(allReports => {
          console.log("All Reports:", allReports);
          dispatch(addAllReportsData(allReports))
          dispatch(updateReports(allReports))
          // setAllReportsData(allReports)
        })
        .catch(error => {
          console.error("Error fetching reports:", error.message);
        });

    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  }


  const updateAuthenticateStatus = async () => {
    setAuthenticated(true)
    if (workspaces == []) {
      await fetchWorkspaces()
    }
  }

  async function fetchAllReports(workspaces) {
    let allReports = [];

    for (const item of workspaces) {
      const reports = await getAllReports(item.id);
      allReports = allReports.concat(reports.value);
    }
    console.log("reports before sending", allReports)
    return allReports;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    console.log("hey")
  }, [])
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
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Router>
          <Route
            exact={true}   
            path="/"
            component={(props) => 
              <Workspace/>
            }
          />
        </Router>
      </Box>
    </Box>
  );
}