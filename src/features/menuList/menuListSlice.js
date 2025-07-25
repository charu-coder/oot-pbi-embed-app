import {createSlice, nanoid} from "@reduxjs/toolkit"


const initialState = {
    menuItems: [  {
        name: "Home",
        exact: true,
        to: "/",
        iconClassName: "bi bi-speedometer2",
      },
    //   {
    //     name: "OOT",
    //     exact: true,
    //     to: `/report/*`,
    //     iconClassName: "bi bi-file-earmark",
    //     subMenus: [],
    //     component: "Report"
    //   },
      {
        name: "Admin",
        exact: true,
        to: `/admin/`,
        iconClassName: "bi bi-file-earmark",
        subMenus: [],
        component: "Admin"
      }
    ]
}

export const menuListSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {
        updateMenuList : (state, action) => {
            state.menuItems = action.payload
        }

    }
})

export const {updateMenuList} = menuListSlice.actions 
export  default menuListSlice.reducer
