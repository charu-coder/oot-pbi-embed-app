import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { PublicClientApplication } from "@azure/msal-browser"
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import * as config from "./Config";
import { Provider } from 'react-redux'
import { store } from "./store/store";

const pca = new PublicClientApplication({
  auth: {
    clientId: "1010c8ac-aff1-4e13-bbc9-2df7ae2167f3",
    authority: "https://login.windows.net/02511c97-883d-44d0-97e4-f726cd3a676b/oauth2/token",
    redirectUri: "http://localhost:3000/home/"
  }
})

const msalInstanceProvider = new PublicClientApplication(generateMsalConfig());

ReactDOM.render(
  // <React.StrictMode>
  //   <App msalInstance={msalInstanceProvider}/>
  // </React.StrictMode>,
  <MsalProvider instance={msalInstanceProvider}>
    <Provider store={store}>
      <App />
    </Provider>

  </MsalProvider>
  ,
  document.getElementById("root")
);

function generateMsalConfig() {
  const msalConfig = {
    auth: {
      clientId: config.clientId,
      authority: config.authorityUrl,
      redirectUri: "http://localhost:3000/home/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  return msalConfig;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
