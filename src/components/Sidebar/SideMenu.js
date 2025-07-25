import React, { useEffect, useState, memo } from "react";
import logo from "../../assets/logo/Icon2.png";
import user from "../../assets/logo/user.png";
import MenuItem from "./MenuItem";
import { reportsDataDummy } from "../../datasets/reports";
import { getAllReports, login, menuItemsTest, tokentest } from "../../utils";
import { useMsal } from "@azure/msal-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllReportsData,
  updateReports,
} from "../../features/reports/reportSlice";
import { updateMenuList } from "../../features/menuList/menuListSlice";

const SideMenu = memo((props) => {
  const [inactive, setInactive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [allReportsData, setAllReportsData] = useState(props.allReportsData);
  const [selMenu, setSelMenu] = useState();
  let selectedWorkspces = sessionStorage
    .getItem("selectedWorkspaces")
    ?.split(",");
  const menuItemstest = useSelector((state) => state.menuListReducer.menuItems);
  const dispatch = useDispatch();
  console.log("menus from side menu", menuItemstest);
  const [menuItems, setMenuItems] = useState(
    menuItemsTest(menuItemstest, allReportsData)
  );
  // let menuItems = menuItemsTest(allReportsData);
  const menuList = useSelector((state) => state.menuListReducer.menuItems);
  const handleToggle = () => {
    setIsChecked(!isChecked); // Toggle the value
  };

  const handleMenuSel = (menuItem) => {
    menuItem?.reports?.length > 0
      ? document.querySelectorAll(".sub-reports").forEach((el, index) => {
          try {
            if (el.classList.contains(menuItem?.name)) {
              el.classList.add("active");
            }
          } catch (err) {
            console.log(err);
          }
        })
      : document.querySelectorAll(".sub-reports").forEach((el) => {
          el.classList.remove("active");
        });
    setSelMenu(menuItem);
  };

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }
    props.onCollapse(inactive);
  }, [inactive]);

  useEffect(() => {
    props.handleToggle(isChecked);
  }, [isChecked]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-category").forEach((el) => {
      el.classList.remove("active");
    });
    document.querySelectorAll(".sub-reports").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(async () => {
    let menuItems = document.querySelectorAll(".menu-item");
    console.log("menuItems SideMenu", menuItems);
    menuItems &&
      menuItems.forEach((el) => {
        el.addEventListener("click", (e) => {
          const next = el.nextElementSibling;
          removeActiveClassFromSubMenu();
          menuItems.forEach((el) => el.classList.remove("active"));
          el.classList.toggle("active");
          if (next !== null) {
            next.classList.toggle("active");
          }
        });
      });
    console.log(
      "from sidemenu",
      menuItemsTest(menuItemstest, props.allReportsData)
    );
    setAllReportsData(props.allReportsData);
    setMenuItems(menuItemsTest(menuItemstest, props.allReportsData));
    let val = await menuItemsTest(menuItemstest, props.allReportsData);
    dispatch(updateMenuList(val));
  }, [props.allReportsData]);

  // useEffect(()=> {
  //   dispatch(updateMenuList(menuItems))

  // }, [menuItems])

  useEffect(() => {
    // dispatch(updateMenuList(menuList))
    let menuItems = document.querySelectorAll(".menu-item");
    console.log("menuItems SideMenu", menuItems);
    menuItems &&
      menuItems.forEach((el) => {
        el.addEventListener("click", (e) => {
          const next = el.nextElementSibling;
          removeActiveClassFromSubMenu();
          menuItems.forEach((el) => el.classList.remove("active"));
          el.classList.toggle("active");
          if (next !== null) {
            next.classList.toggle("active");
          }
        });
      });
    setMenuItems(menuList);
  }, [menuList]);
  return (
    <div
      className={`side-menu ${inactive ? "inactive" : ""}`}
      style={{ backgroundColor: `${isChecked ? "black" : "white"}` }}
    >
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      {/* <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div> */}

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuList &&
            menuList?.map((menuItem, index) => (
              <MenuItem
                key={index}
                name={menuItem.name}
                exact={menuItem.exact}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                iconClassName={menuItem.iconClassName}
                isChecked={isChecked}
                menuItem={menuItem}
                onClick={(e) => {
                  if (inactive) {
                    setInactive(false);
                  }
                  handleMenuSel(menuItem);
                }}
                isActive={inactive}
              />
            ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>
      <div></div>
      <div
        className="footer"
        style={{ color: `${isChecked ? "#6B6C6Fff" : "black"}` }}
      >
        {/* <div className="side-menu-footer">
          <div className={`avatar${inactive ? "inactive" : ""}`}>
            <img src={user} alt="user" />
          </div>
          <div className={`user-info${inactive ? "inactive" : ""}`}>
            <h5>User Name</h5>
            <p>username@mail.com</p>
          </div>
          <button onClick={handleSignIn}>
            {" "}
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div> */}
        {/* <div className="divider"></div> */}

        <div className="side-menu-footer-theme">
          <div className={`avatar${inactive ? "inactive" : ""}`}>
            {/* <img src={user} alt="user" /> */}
            <i class="bi bi-moon"></i>
          </div>
          <div className={`content${inactive ? "inactive" : ""}`}>
            {/* <img src={user} alt="user" /> */}
            {/* <i class="bi bi-moon"></i> */}
            <h5>Dark/Light Mode </h5>
          </div>
          <div className="dark_light_theme">
            <label class="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideMenu;
