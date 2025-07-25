import React from 'react';
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
const boxStyle = {
    //   backgroundColor: 'green',
    margin: '8px',
    display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    fontSize: '18px',
    color: 'white',
};

const BoxComponent = ({ children }) => (
    <div style={boxStyle}>
        {children}
    </div>
);

const Home = () => (
    <div style={{paddingTop:"20px", paddingBottom:"20px", height:"inherit"}}>
          <PowerBIEmbed
        key={false}
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: "5dd47363-29f8-4984-90d4-2c7e7fc947c5",
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=5dd47363-29f8-4984-90d4-2c7e7fc947c5&groupId=d98dbbf9-63bf-4c37-ac97-584e3997a220&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsImRpc2FibGVBbmd1bGFySlNCb290c3RyYXBSZXBvcnRFbWJlZCI6dHJ1ZX19",
            accessToken: `${sessionStorage.getItem("access_token")}`,
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed      
            permissions: models.Permissions.All,
            viewMode:   models.ViewMode.View,


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
        {/* <div style={{ width: "98%", backgroundColor: "white", padding: "1em", display: "flex" }}> */}
            {/* <div style={{ width: "70%" }}> */}
                {/* <video src={backgroundVedio} /> */}
                {/* <h2>Welcome to our Enhanced Analytics Hub - Unleashing the Power of Embedding!"
                </h2>
                <ul style={{ listStyleType: 'disc', margin: "2em" }}>
                    <li style={{ listStyleType: 'disc' }}>Access embedded reports seamlessly within our Analytics Hub for a unified analytics experience.</li>
                    <li style={{ listStyleType: 'disc' }}>Empower users to drill down and customize views in embedded reports for interactive data exploration.</li>
                </ul> */}
            {/* </div> */}
            {/* <div className="img_bg" style={{
                backgroundImage: `url(${backgroundImage})`, backgroundRepeat: "no-repeat",
                alignContent: "left", height: "20vh", width: "20%", backgroundSize: "contain"
            }}> */}


            {/* </div> */}
        {/* </div> */}

        {/* <div style={{ height: '70vh', display: 'flex', margin: "10px", backgroundColor: "black" }}> */}
        {/* <img src={DemandPlanning} alt="Box 1" style={{ width: '100%',objectFit:"contain" }} /> */}
            {/* <div style={{ width: '20%', display: 'flex', flexDirection: 'column', margin: '10px' }}>
                <img src={DemandPlanning} alt="Box 1" style={{ width: '100%', height: '100%' }} />
            </div> */}

            {/* <div style={{ ...boxStyle, flexDirection: 'column', width: '80%' }}>
                <div style={{ display: 'flex', height: "30vh", margin: "10px" }}>
                    {[1, 2, 3].map((index) => (
                        <div key={index} style={{ flex: 1, margin: "10px" }}>
                            <img src={Demand} alt="Box 1" style={{ width: '100%', height: "100%" }} />
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', height: "30vh", margin: "10px" }}>
                    {[4, 5, 6].map((index) => (
                        <div key={index} style={{ flex: 1, margin: "10px" }}>
                            <img src={Logistics} alt="Box 1" style={{ width: '100%', height: "100%" }} />
                        </div>
                    ))}
                </div>
            </div> */}
        {/* </div> */}
    </div>

);

export default Home;
















// import React from 'react';
// import DemandPlanning from "../assets/Supply Chain.png"
// import Demand from "../assets/Demand Planning (1).png"
// import Logistics from "../assets/Logistics & Distribution.png"
// import backgroundImage from "../assets/bgImg3.jpg"
// const boxStyle = {
//     //   backgroundColor: 'green',
//     margin: '8px',
//     display: 'flex',
//     //   justifyContent: 'center',
//     //   alignItems: 'center',
//     fontSize: '18px',
//     color: 'white',
// };

// const BoxComponent = ({ children }) => (
//     <div style={boxStyle}>
//         {children}
//     </div>
// );

// const Home = () => (
//     <div style={{paddingTop:"20px", paddingBottom:"20px"}}>
//         <div style={{ width: "98%", backgroundColor: "white", padding: "1em", display: "flex" }}>
//             <div style={{ width: "70%" }}>
//                 <h2>Welcome to our Enhanced Analytics Hub - Unleashing the Power of Embedding!"
//                 </h2>
//                 <ul style={{ listStyleType: 'disc', margin: "2em" }}>
//                     <li style={{ listStyleType: 'disc' }}>Access embedded reports seamlessly within our Analytics Hub for a unified analytics experience.</li>
//                     <li style={{ listStyleType: 'disc' }}>Empower users to drill down and customize views in embedded reports for interactive data exploration.</li>
//                 </ul>
//             </div>
//             <div className="img_bg" style={{
//                 backgroundImage: `url(${backgroundImage})`, backgroundRepeat: "no-repeat",
//                 alignContent: "left", height: "20vh", width: "20%", backgroundSize: "contain"
//             }}>


//             </div>
//         </div>

//         <div style={{ height: '70vh', display: 'flex', margin: "10px", backgroundColor: "black" }}>
//         <img src={DemandPlanning} alt="Box 1" style={{ width: '100%',objectFit:"contain" }} />
//             {/* <div style={{ width: '20%', display: 'flex', flexDirection: 'column', margin: '10px' }}>
//                 <img src={DemandPlanning} alt="Box 1" style={{ width: '100%', height: '100%' }} />
//             </div> */}

//             {/* <div style={{ ...boxStyle, flexDirection: 'column', width: '80%' }}>
//                 <div style={{ display: 'flex', height: "30vh", margin: "10px" }}>
//                     {[1, 2, 3].map((index) => (
//                         <div key={index} style={{ flex: 1, margin: "10px" }}>
//                             <img src={Demand} alt="Box 1" style={{ width: '100%', height: "100%" }} />
//                         </div>
//                     ))}
//                 </div>
//                 <div style={{ display: 'flex', height: "30vh", margin: "10px" }}>
//                     {[4, 5, 6].map((index) => (
//                         <div key={index} style={{ flex: 1, margin: "10px" }}>
//                             <img src={Logistics} alt="Box 1" style={{ width: '100%', height: "100%" }} />
//                         </div>
//                     ))}
//                 </div>
//             </div> */}
//         </div>
//     </div>

// );

// export default Home;
