import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SaveIcon from "@mui/icons-material/Save";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageNavigationIcon from "@mui/icons-material/NavigationTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { updateReportEditMode } from "../../../features/reports/reportSlice";

const PageNavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
 const dispatch = useDispatch()
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateReportPageNavigation = (mode) => {
    dispatch(updateReportPageNavigation(mode))
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleMenuClick}>
        <PageNavigationIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => updateReportPageNavigation("bottom")}>Bottom</MenuItem>
        <MenuItem onClick={() => updateReportPageNavigation("left")}>Left</MenuItem>
      </Menu>
    </>
  );
};

const AppMenu = (props) => {
  const updatedReports = useSelector((state) => state.reportReducer.updatedReports);
  const reportEditMode = useSelector((state) => state.reportReducer.reportEditMode);
  const dispatch = useDispatch();

  const handleEditMode = () => {
    dispatch(updateReportEditMode(true));
  };

  const closeEditMode = () => {
    dispatch(updateReportEditMode(false));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props?.report?.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <PageNavigationMenu /> */}
          {!reportEditMode ? (
            <IconButton color="inherit" onClick={handleEditMode}>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={closeEditMode}>
              <SaveIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppMenu;
