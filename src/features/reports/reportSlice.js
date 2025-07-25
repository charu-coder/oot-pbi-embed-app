import {createSlice, nanoid} from "@reduxjs/toolkit"


const initialState = {
    allReportsData: [],
    updatedReports: [],
    reportEditMode: false,
    reportPageNavigation: "bottom"
}

export const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        updateReports : (state, action) => {
            state.updatedReports = action.payload
        },

        addAllReportsData : (state, action) => {
            state.allReportsData =  action.payload
        },
        updateReportEditMode : (state, action) => {
            state.reportEditMode = action.payload
        },
        updateReportPageNavigation : (state, action) => {
            state.reportPageNavigation = action.payload
        }

    }
})

export const {updateReports, addAllReportsData, updateReportEditMode, updateReportPageNavigation} = reportSlice.actions 
export  default reportSlice.reducer
