import { configureStore} from "@reduxjs/toolkit"
import reportReducer from "../features/reports/reportSlice"
import workspaceReducer from "../features/workspaces/workspaceSlice"
import menuListReducer from "../features/menuList/menuListSlice"
export const store  = configureStore({
    reducer:{reportReducer,workspaceReducer,menuListReducer}
})

