import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { reportsDataDummy } from "../../../datasets/reports";
import CategoryHierarchy from "../../Heirarchy/CategoryHierarchy";
import YourComponent from "../../Heirarchy/CategoryTree";
import ControlledTreeView from "../../Heirarchy/TreeView";
import ListPage from "../../Heirarchy/TreeView";
import CategoryCreationForm from "../../Heirarchy/CategoryCreation";
import CategoryModal from "../../Heirarchy/CategoryCreation";


const Admin = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);
//   reportsDataDummy

useEffect(()=>{
console.log("hey")
},[])
  return (
    // <CategoryHierarchy />
    // <YourComponent />
    // <ControlledTreeView />
    <ListPage />
    // <CategoryCreationForm />
    // <CategoryModal />

  );
};

export default Admin;
