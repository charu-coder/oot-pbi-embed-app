import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { generateEmbedToken } from '../../../utils';
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

const Home = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [powerBIToken, setPowerBIToken] = useState(null)
  const [embedUrl, setEmbedUrl] = useState(null)
  const [embedToken, setEmbedToken] = useState(null)

  // const fetchEmbedToken = async (token) => {
  //   console.log("listen icam ok")
  //   const token = await generateEmbedToken({ reportId: "bb5386c0-778e-4d43-9761-7791db227376", workspaceId: "37b470f3-fa33-45c5-b8eb-fff7341ed780", accessToken: token });
  //   setEmbedToken(token);
  // };

  const fetchEmbedToken = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/pbi-token`);

      if (!res.ok) {
        const errorText = await res.text(); // Helpful for debugging
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("Token response:", data); // Should show the token

      return data; // Return token object
    } catch (error) {
      console.error("Failed to fetch embed token:", error);
      return null;
    }
  };

  const fetchEmbedUrl = async ({ reportId, workspaceId, accessToken }) => {

    const response = await fetch(`https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    console.log("for you babyy:", data.embedUrl); // This is the embed URL
    setEmbedUrl(data.embedUrl)

  }
  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch(`${apiUrl}/api/pbi-token`);
      if (!res.ok) {
        const errorText = await res.text(); // Helpful for debugging
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log("Token response:", data); // Should show the token

      // return data; // Return token object
      setPowerBIToken(data.access_token);
      console.log("before sending token bro", res)
      await fetchEmbedUrl({ reportId: "5dd47363-29f8-4984-90d4-2c7e7fc947c5", workspaceId: "d98dbbf9-63bf-4c37-ac97-584e3997a220", accessToken: data.access_token })
      const token = await generateEmbedToken({ reportId: "5dd47363-29f8-4984-90d4-2c7e7fc947c5", workspaceId: "d98dbbf9-63bf-4c37-ac97-584e3997a220", datasetId: "92d1baa2-a11a-4d28-baa6-c44b3d50a68d", accessToken: data.access_token });

      setEmbedToken(token);
    };

    fetchToken();
  }, []);




  return (
    <div style={{ paddingTop: "20px", paddingBottom: "20px", height: "inherit" }}>
      {powerBIToken &&
        // <PowerBIEmbed
        //   key={false}
        //   embedConfig={{
        //     type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        //     id: "5dd47363-29f8-4984-90d4-2c7e7fc947c5",
        //     embedUrl: embedUrl,
        //     accessToken: embedToken,
        //     tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed      
        //     permissions: models.Permissions.All,
        //     viewMode: models.ViewMode.View,


        //     settings: {
        //       panes: {
        //         bookmarks: {
        //           visible: false,
        //           expanded: false
        //           // expanded: false
        //         },
        //         fields: {
        //           expanded: false
        //         },
        //         filters: {
        //           // expanded: false,
        //           visible: true
        //         },
        //         pageNavigation: {
        //           visible: true,
        //           position: models.PageNavigationPosition.Left
        //         },

        //         visualizations: {
        //           expanded: false
        //         }
        //       },
        //     },
        //   }}
        //   eventHandlers={
        //     new Map([
        //       [
        //         "loaded",
        //         function () {
        //           console.log("Report loaded");
        //         },
        //       ],
        //       [
        //         "rendered",
        //         function () {
        //           console.log("Report rendered");
        //         },
        //       ],
        //       [
        //         "error",
        //         function (event) {
        //           console.log(event.detail);
        //         },
        //       ],
        //       ["visualClicked", () => console.log("visual clicked")],
        //       ["pageChanged", (event) => console.log(event)],
        //     ])
        //   }
        //   cssClassName={"embed-container"}
        //   getEmbeddedComponent={(embeddedReport) => {
        //     window.report = embeddedReport;
        //   }}
        // />
        <PowerBIEmbed
          embedConfig={{
            type: "report",
            id: "5dd47363-29f8-4984-90d4-2c7e7fc947c5",
            embedUrl: embedUrl, // Must be correct and from API
            accessToken: embedToken, // Token from your generateEmbedToken
            tokenType: models.TokenType.Embed,
            permissions: models.Permissions.All,
            viewMode: models.ViewMode.View,
            settings: {
              panes: {
                bookmarks: { visible: false, expanded: false },
                fields: { expanded: false },
                filters: { visible: true },
                pageNavigation: {
                  visible: true,
                  position: models.PageNavigationPosition.Left
                },
                visualizations: { expanded: false }
              }
            }
          }}
          eventHandlers={new Map([
            ["loaded", () => console.log("Report loaded")],
            ["rendered", () => console.log("Report rendered")],
            ["error", (event) => console.error("Power BI Embed Error", event.detail)],
            ["pageChanged", (event) => console.log("Page changed", event)],
          ])}
          cssClassName="embed-container"
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />

      }

    </div>

  );
}

export default Home;








