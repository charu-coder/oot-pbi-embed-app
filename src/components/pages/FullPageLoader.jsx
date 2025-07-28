// src/components/FullPageLoader.js
import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const FullPageLoader = ({ open, message = "Loading, please wait..." }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent
      }}
    >
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography mt={2}>{message}</Typography>
      </Box>
    </Backdrop>
  );
};

export default FullPageLoader;
