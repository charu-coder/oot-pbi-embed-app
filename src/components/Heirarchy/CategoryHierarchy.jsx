import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import EditMode from './EditMode';
import { useSelector } from 'react-redux';

const initialData = [
  {
    name: 'Home',
    exact: true,
    to: '/',
    iconClassName: 'bi bi-speedometer2',
  },
  {
    name: 'Reports',
    exact: true,
    to: '/report',
    iconClassName: 'bi bi-file-earmark',
    subMenus: [
      { name: 'Sales & Returns Sample v201912 (1)', to: '/report/Sales & Returns Sample v201912 (1)' },
      { name: 'Questionnaire Form POCs', to: '/report/Questionnaire Form POCs' },
      { name: 'MS Forms Questionnaire Test Auto Refresh', to: '/report/MS Forms Questionnaire Test Auto Refresh' },
      { name: 'MS Form Questionnaire POC', to: '/report/MS Form Questionnaire POC' },
      { name: 'Project Sunlight Safety Performance (1)', to: '/report/Project Sunlight Safety Performance (1)' },
      { name: 'US Sales Analysis', to: '/report/US Sales Analysis' },
    ],
  },
  {
    name: 'Dashboard',
    to: '/dashboard',
    iconClassName: 'bi bi-view-stacked',
  },
];

const ViewMode = ({ categories, onEditClick }) => {
  // const menuList = useSelector((state) => state.menuListReducer.menuItems)
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleEditModeClose = () => {
    setIsEditMode(false);
  };

  console.log("categories viewmode", categories)
  return (
    <div >
      {/* <Typography variant='h5'> */}
      <span><h2 style={{ display: "inline" }}>
      (L0) Categories </h2></span> &nbsp;
      <IconButton style={{ display: "inline" }} onClick={onEditClick}>
        <EditIcon />
      </IconButton>
      {/* </Typography> */}

      <div style={{ marginBottom: 20 }}>
        {categories?.map((category) => (
          <Accordion key={category.name}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Typography width={"-webkit-fill-available"}>{category.name}</Typography>
              <IconButton edge="end" aria-label="edit" style={{width:"60px"}}>
                  <EditIcon onClick={(e) => setIsEditMode(true)}/>
                </IconButton>
            </AccordionSummary>
            
            {category.report && (
              <div style={{ paddingLeft: 20, maxWidth: "none" }}>
                {category.report?.map((submenu) => (
                  <Typography key={submenu.name}>{submenu.name}</Typography>
                ))}
              </div>
            )}
            {isEditMode && (
              <EditMode categories={category} onClose={handleEditModeClose} />
            )}  
          </Accordion>
        ))}
      </div>
    </div>
  );
};



const CategoryHierarchy = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const menuList = useSelector((state) => state.menuListReducer.menuItems)
  const reportObjects = menuList.find(item => item.component === "Report")?.testArray;
  
  const [menuItems, setMenuItems] = useState(reportObjects)

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleEditModeClose = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
  const reportObjects = menuList.find(item => item.component === "Report")?.testArray;
    console.log("wrong", reportObjects,menuItems,menuList)
    setMenuItems(reportObjects)
  }, [menuList])

  return (
    <Container style={{ paddingTop: 20, maxWidth: "none" }}>
      
      {isEditMode ? (
        <>
          <EditMode categories={menuItems} onClose={handleEditModeClose} />
          <ViewMode categories={menuItems} onEditClick={handleEditClick} />
        </>

      ) : (
        <ViewMode categories={menuItems} onEditClick={handleEditClick} />
      )}
    </Container>
  );
};

export default CategoryHierarchy;
