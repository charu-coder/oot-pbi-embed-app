import {createSlice, nanoid} from "@reduxjs/toolkit"


const initialState = {
    workspaces: [],
    selWorkspaces: []
}

export const workspaceSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        updateSelWorkspace : (state, action) => {
            state.selWorkspaces = action.payload
        },

        updateWorkspaces : (state, action) => {
            state.workspaces =  action.payload
        }

    }
})

export const {updateSelWorkspace, updateWorkspaces} = workspaceSlice.actions 
export  default workspaceSlice.reducer
