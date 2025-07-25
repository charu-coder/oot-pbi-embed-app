import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import HomeIcons from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "../../assets/home.png";
import AdminIcon from "../../assets/setting.png";
import BulletIcon from "../../assets/more.png";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact, menuItem,isActive } = props;
  const [expand, setExpand] = useState(null);
  const [subcategoryReportSel, setSubcategoryReportSel] = useState(false);
  const [reportSel, setReportSel] = useState(false);
  // const [isActive, setIsActive] = useState(false)

  const handleMenuSel = (menu) => {};

 useEffect(()=>{
 console.log("isActive",isActive)
 },[isActive])
  return (
    <li onClick={props.onClick}>
      <Link
        exact
        to={to}
        className={`menu-item`}
        style={{ color: `${props.isChecked ? "#27A4B5ff" : "black"}` }}
      >
        <div className="menu-icon">
          {name == "Home" && (
            <img
              src={HomeIcon}
              style={{ width: "25px", height: "25px", marginTop: "5px" }}
            />
          )}

          {/* {name == "Admin" && (<AdminPanelSettingsIcon />)} */}
          {name == "Admin" && (
            <img
              src={AdminIcon}
              style={{ width: "25px", height: "25px", marginTop: "5px" }}
            />
          )}

          {/* {name != "Home" && name !="Admin" && ( <CategoryIcon /> )} */}
          {name != "Home" && name != "Admin" && (
            <img
              src={BulletIcon}
              style={{ width: "20px", height: "20px", marginTop: "10px" }}
            />
          )}
        </div>
        <span>{name}</span>
      </Link>

      {/* {subMenus && subMenus?.length > 0 ? (
        <ul className={`sub-menu`}>
          {subMenus?.map((menu, index) => (
            <li key={index} onClick={handleMenuSel(menu)}>
              <NavLink to={menu.to}>{menu.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null} */}
      
      {menuItem?.subCategories && menuItem?.subCategories?.length > 0 ? (
       
        <ul className={`sub-category`}>
          {menuItem?.subCategories?.map((menu, index) => (
            <li key={index} onClick={handleMenuSel(menu)}>
              <NavLink to={"/report/"}>{menu.name}</NavLink>
              {menu?.reports?.length > 0 && (
                <ul style={{ marginLeft: "20px", background: "white" }}>
                  {menu?.reports?.map((report, index) => (
                    <li
                      key={report.id}
                      onClick={() => {
                        setSubcategoryReportSel(report.id)
                        setReportSel(false)
                      }}
                    >
                      <NavLink
                        to={`/report/${report.name}`}
                        style={{
                          // background: "white",
                          borderBottom: "1px solid grey",
                          backgroundColor:
                            report.id == subcategoryReportSel
                              ? "aquamarine"
                              : "",
                          fontWeight:
                            report.id == subcategoryReportSel
                              ? "bold"
                              : "inherit",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                      >
                        {report.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

      ) : null} 

      <ul className={`sub-reports ${menuItem?.name}`}>
        {menuItem?.reports?.map((report, index) => (
          <li key={index} onClick={() => {
            setReportSel(report.id)
            setSubcategoryReportSel(false)
            // setIsActive(!isActive)
          }}>
            <NavLink
              to={`/report/${report.name}`}
              style={{
                backgroundColor:
                  report.id == reportSel ? "aquamarine" : "",
                fontWeight:
                  report.id == reportSel ? "bold" : "inherit",
                cursor: "pointer",
                borderBottom: "1px solid grey",
                borderRadius: "2px"
              }}
            >
              {report.name}
            </NavLink>
          </li>
        ))}
      </ul>
      
    </li>
  );
};

export default MenuItem;
