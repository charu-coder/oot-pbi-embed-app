import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { reportsDataDummy } from "../../../datasets/reports";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../../../App.scss";
import { connect, useDispatch, useSelector } from "react-redux"
import { addAllReportsData, updateReportEditMode, updateReports } from "../../../features/reports/reportSlice"
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import PrimarySearchAppBar from "./AppBar";
import AppMenu from "./AppBar";
import { isTokenExpired } from "../../../utils";


const Report = (props) => {
  const {
    name,
    subMenus,
    iconClassName,
    onClick,
    to,
    exact,
    allReportsData,
    inactive,
  } = props;
  const updatedReports = useSelector((state) => state.reportReducer.updatedReports)
  const reportEditMode = useSelector((state) => state.reportReducer.reportEditMode)
  const [editMode, setEditMode] = useState("View");
  const [selReport, setSelectedReport] = useState(updatedReports?.[0]);
  const dispatch = useDispatch()
  console.log("hi called", reportEditMode, props)
  useEffect(() => {
    let selectedReport = updatedReports?.find(report => report.name === props.location?.pathname.replace("/report/", "").replace("%20", " "))
    console.log("hi called select", selectedReport, props)

    setSelectedReport(selectedReport);

  }, [props.location.pathname]);

  const handlePBIViewMode = () => {
    if (editMode == "View") {
      setEditMode("Edit")
      dispatch(updateReportEditMode(true))
    } else {
      setEditMode("View")
      dispatch(updateReportEditMode(false))
    }

  }

  useEffect(() => {
    console.log("edit mode", reportEditMode, props)
    // window.location.reload()

  }, [reportEditMode]);

  useEffect(() => {
    isTokenExpired()
  }, []);


  console.log("checking sel reports", selReport)
  return (
    <>
      {/* <h1>{selReport?.name}</h1> */}
      {selReport !== undefined ? (

        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppMenu report={selReport} />
          </Box>
          {/* { props.reportEditMode  ( */}

          <PowerBIEmbed
            key={reportEditMode}
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: selReport?.id,
              embedUrl: selReport?.embedUrl,
              accessToken: `${sessionStorage.getItem("access_token")}`,
              tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed      
              permissions: models.Permissions.All,
              viewMode: reportEditMode ? models.ViewMode.Edit : models.ViewMode.View,


              settings: {
                panes: {
                  bookmarks: {
                    visible: false,
                    expanded: false
                    // expanded: false
                  },
                  fields: {
                    expanded: false
                  },
                  filters: {
                    // expanded: false,
                    visible: true
                  },
                  pageNavigation: {
                    visible: true,
                    position: models.PageNavigationPosition.Left
                  },

                  visualizations: {
                    expanded: false
                  }
                },
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function (event) {
                    console.log(event.detail);
                  },
                ],
                ["visualClicked", () => console.log("visual clicked")],
                ["pageChanged", (event) => console.log(event)],
              ])
            }
            cssClassName={"embed-container"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />




        </>
      ) : (<></>)}
    </>


  );
};

const mapStateToProps = (state) => ({
  updatedReports: state.reportReducer.updatedReports,
  editMode: state.reportReducer.reportEditMode
});

export default connect(mapStateToProps)(Report);
