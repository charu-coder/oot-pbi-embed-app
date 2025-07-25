import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import Grid from '@mui/material/Grid';
import CheckboxListSecondary from "./CheckboxListSecondary";
import backgroundImage from "../../../assets/bgImg3.jpg"
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux"
import { updateReports } from "../../../features/reports/reportSlice";
import { updateSelWorkspace } from "../../../features/workspaces/workspaceSlice";
import { isTokenExpired } from "../../../utils";



const Workspace = memo((props) => {
  const reports = useSelector((state) => state.reportReducer.allReportsData)
  const selectedReports = useSelector((state) => state.reportReducer.updatedReports)


  const [selReports, setSelReports] = useState(reports)
  // const { workspaces, allReports } = props
  const [updateReport, setUpdatedReports] = useState(props.allReports)
  const dispatch = useDispatch()
  const selWorkspaces = useSelector((state) => state.workspaceReducer.selWorkspaces)
  const workspaces = useSelector((state) => state.workspaceReducer.workspaces)




  const selectedWorkspaces = (list) => {
    dispatch(updateSelWorkspace(list))
    let selectedWorkspaceIds = list?.map(workspace => workspace.id);
    const filteredReports = reports && reports.filter(report => selectedWorkspaceIds.includes(report.datasetWorkspaceId));
    dispatch(updateReports(filteredReports))
    setSelReports(filteredReports)
    // dispatch(updateReports(filteredReports))
  }



  const updateReportSequence = (list) => {
    // e.preventDefault()
    setSelReports(list)
    // props.updateReportsSequence(list)
    dispatch(updateReports(list))
  }

  useEffect(() => {
    console.log("from redux store workspace", selectedReports)
  }, [])

  useEffect(() => {
    isTokenExpired()
}, []);

  return (
    <>
      <Grid container spacing={2}>

        <Grid item xs={12} >
          {/* <div style={{height:"30vh",backgroundColor:"white"}}> Image</div> */}
          <div style={{ width: "98%", backgroundColor: "white", padding: "1em", display: "flex" }}>
            <div style={{ width: "70%" }}>
              <h2>Welcome to our Enhanced Analytics Hub - Unleashing the Power of Embedding!"
              </h2>
              <ul style={{ listStyleType: 'disc', margin: "2em" }}>
                <li style={{ listStyleType: 'disc' }}>Access embedded reports seamlessly within our Analytics Hub for a unified analytics experience.</li>
                <li style={{ listStyleType: 'disc' }}>Empower users to drill down and customize views in embedded reports for interactive data exploration.</li>
              </ul>
            </div>
            <div className="img_bg" style={{
              backgroundImage: `url(${backgroundImage})`, backgroundRepeat: "no-repeat",
              alignContent: "left", height: "20vh", width: "20%", backgroundSize: "contain"
            }}>


            </div>
          </div>

        </Grid>

        <Grid item xs={6}>
          <div style={{ backgroundColor: "white", height: "60vh", padding: "1em" }}>
            <h2>Workspaces</h2>
            {workspaces.length > 0 ? <CheckboxListSecondary list={workspaces} selectedWorkspaces={selectedWorkspaces} enableCheckbox={true} /> :
              <CircularProgress disableShrink />
            }
          </div>
       
        </Grid>
        {/* <Grid item xs={4}>
          <div style={{ backgroundColor: "white", height: "60vh", padding: "1em" }}>
            <CategoryHierarchy />
          
          </div>
        </Grid> */}
        <Grid item xs={6}>
          <div style={{ backgroundColor: "white", height: "60vh", padding: "1em" }}>
            <h2>Reports</h2>
            {reports.length > 0 ? <CheckboxListSecondary list={selectedReports} enableCheckbox={false} updateReportSequence={updateReportSequence} /> :
              <CircularProgress disableShrink />}

          </div>
        </Grid>
      </Grid>
    </>
  );
})

export default Workspace