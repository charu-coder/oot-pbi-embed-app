// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------



// Scope Base of AAD app. Use the below configuration to use all the permissions provided in the AAD app through Azure portal.
// Refer https://aka.ms/PowerBIPermissions for complete list of Power BI scopes

// URL used for initiating authorization request
export const authorityUrl = "https://login.microsoftonline.com/common/";

// End point URL for Power BI API
export const powerBiApiUrl = "https://api.powerbi.com/";

// Scope for securing access token
export const scopeBase = ["https://analysis.windows.net/powerbi/api/Report.ReadWrite.All","https://analysis.windows.net/powerbi/api/Workspace.Read.All", "https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All" ];

// Client Id (Application Id) of the AAD app.
export const clientId = "8932dac3-2ae2-42c7-9ab7-ea3f007891bd";

// Id of the workspace where the report is hosted
export const workspaceId = "37b470f3-fa33-45c5-b8eb-fff7341ed780";

// Id of the report to be embedded
export const reportId = "cc1fde6e-4e47-422b-b4e9-4594c54de4e5";