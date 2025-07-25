import "./App.scss";
import SideMenu, { menuItems } from "./components/Sidebar/SideMenu";
import { AuthenticationResult, InteractionType, EventMessage, EventType, AuthError } from "@azure/msal-browser";
import { MsalContext, useMsal } from "@azure/msal-react";
import React, { useEffect, useRef, useState } from "react";
import { service, factories, models, IEmbedConfiguration } from "powerbi-client";
// import "./App.css";
import * as config from "./Config";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import Workspace from "./components/pages/Workspace/Workspace";
import Tiles from "./components/pages/Tiles/Tiles";
import Report from "./components/pages/Report/Report";
import { MsalProvider } from "@azure/msal-react";
import { authenticateToken, getAllReports, getMyOrgWorkspaces, isTokenExpired, login } from "./utils";
import BasicModal from "./components/MultiActionAreaCard";
import MultiActionAreaCard from "./components/MultiActionAreaCard";
import LoginScreen from "./components/pages/Login Screen/LoginScreen";
import { connect, useDispatch, useSelector } from "react-redux"
import { addAllReportsData, updateReports } from "./features/reports/reportSlice";
import { updateSelWorkspace, updateWorkspaces } from "./features/workspaces/workspaceSlice";
import MiniDrawer from "./components/Heirarchy/Drawer";
import Admin from "./components/pages/Admin/Admin";
import Home from "./components/pages/Home/Home";

const powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);

const Dashboard = () => <h1>Dashboard</h1>;
const Content = () => <h1>Content</h1>;
const Courses = () => <h1>Content/Courses</h1>;
const Videos = () => <h1>Content/Videos</h1>;
const Design = () => <h1>Design</h1>;
const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;
let accessToken = sessionStorage.getItem("access_token");
let embedUrl = "";
// let isAuthenticated = sessionStorage.getItem("access_token") ? true : false

function App({ msalInstance }) {
    const [inactive, setInactive] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedWorkspace, setSelWorkspace] = useState(
        "6cceba03-8d48-4e74-a924-fd93b2b03656"
    );
    const [allReportsData, setAllReportsData] = useState([]);
    const [selId, setSelId] = useState(-1);
    const { instance, accounts, inProgress } = useMsal();
    const [tokenState, setTokenState] = useState({ accessToken: "", embedUrl: "", error: [] });
    const [tokenStatus, setTokenStatus] = useState(false)
    const [isAuthenticated, setAuthenticated] = useState(accounts?.length > 0 ? true : false)
    const [workspaces, setWorkspaces] = useState([])
    const [selMenu, setSelMenu] = useState()
    let selectedWorkspces = sessionStorage.getItem("selectedWorkspaces")?.split(",");
    const dispatch = useDispatch()
    const reports = useSelector((state) => state.reportReducer.allReportsData)
    const reportEditMode = useSelector((state) => state.reportReducer.reportEditMode)
    const updatedReports = useSelector((state) => state.reportReducer.updatedReports)
    const menuList = useSelector((state) => state.menuListReducer.menuItems)

    useEffect( () => {
        if (isTokenExpired()) {
            setTokenStatus(true)
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
        console.log("from redux store app", reports)

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
            // console.log("outside this function")

            setWorkspaces(res)

            dispatch(updateSelWorkspace(res))
            dispatch(updateWorkspaces(res))
            // console.log("inside this function")
            await fetchAllReports(res)
                .then(allReports => {
                    // console.log("All Reports:", allReports);
                    dispatch(addAllReportsData(allReports))
                    dispatch(updateReports(allReports))
                    setAllReportsData(allReports)
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
        // console.log("reports before sending", allReports)
        return allReports;
    }

    const updateReportsSequence = (list) => {
        setAllReportsData(list)
    }
    console.log("edit mode app", reportEditMode)
    useEffect(() => {

    }, [reportEditMode])
    // console.log("from report state", allReportsData)
    return (
        // <div>hi</div>
        // <MsalProvider instance={msalInstance}>
        // <MultiActionAreaCard />
        // <MiniDrawer />
        <div className="App">
            {!isAuthenticated ? (
                // <MultiActionAreaCard handleLogin = {handleLogin}/>
                <LoginScreen handleLogin={handleLogin} updateAuthenticateStatus={updateAuthenticateStatus} />

            ) : (
                <Router>
                    <SideMenu
                        onCollapse={(inactive) => {
                            setInactive(inactive);
                        }}
                        handleToggle={(isChecked) => {
                            setIsChecked(!isChecked);
                        }}
                        workspaceId={selectedWorkspace}
                        allReportsData={updatedReports}
                    />

                    <div
                        className={`container ${inactive ? "inactive" : ""}`}
                        style={{ backgroundColor: `${isChecked ? "#f4f9f4" : "#666"}` }}
                    >


                        {/* <Route
                            exact={true}
                            path="/"
                            component={Workspace}
                        />
                        <Route exact={true} path="/home/dashboard" component={Dashboard} />

                        <Route exact={true} path="/home/report/*"  render={(props) => <Report {...props}/>} />
                        <Route exact={true} path="/report"  render={(props) => <Report {...props}/>}  /> */}

                        {menuList?.map((route,i) => (
                            route.component != "Report" ? 
                            <Route key={i} exact={true} path={route.to} component={route.component == "Home" ? Home : Admin} /> :
                            <Route key={i} exact={true} path={route.to}  render={(props) => <Report {...props}/>}/> 
                        ))}
                    </div>
                </Router>
            )}

        </div>
        // </MsalProvider>
    );
}

const mapStateToProps = (state) => ({
    updatedReports: state.reportReducer.updatedReports,
    editMode: state.reportReducer.reportEditMode
});


// Connect the component to Redux using the connect function
export default connect(mapStateToProps)(App);