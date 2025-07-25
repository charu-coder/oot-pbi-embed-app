import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuList } from '../../features/menuList/menuListSlice';

const EditMode = ({ categories, open, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isCategoryEditMode, setIsCategoryEditMode] = useState(false);
  const [isSubcategoryEditMode, setIsSubcategoryEditMode] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editSubcategoryName, setEditSubcategoryName] = useState('');
  const [data, setData] = useState(categories);
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menuListReducer.menuItems)
  const updatedReports = useSelector((state) => state.reportReducer.updatedReports)
  const [addSubCatActive,setAddSubCatActive]= useState(false)
  let menuListDummy = menuList

  console.log("categories in editmode ",categories)

  const handleAddCategory = () => {
    const newCategory = {
      name: "Edit Category",
      exact: true,
      to: `/category/NAC/`,
      iconClassName: "bi bi-file-earmark",
      component: "Report",
      report: []
     };


    let test = {...data}
    let updatedData = [...data.subCategories]
    updatedData?.push(newCategory) 
    test.subCategories = updatedData 

    // test.subCategories = updatedData

    // const updatedData = [...data, newCategory];
    menuListDummy = menuListDummy?.map((category) => 
       category.name === "OOT" ? { ...category, testArray : {...test}} : category
    )
    console.log("testing addition",menuList,menuListDummy,test);

    setData(test);
    // dispatch(updateMenuList(updatedData));
  };

  const handleEditCategory = (selCategory) => {
    setIsCategoryEditMode(true);
    setIsSubcategoryEditMode(true)
    setAddSubCatActive(false)
    setEditCategoryName(selCategory?.name);
    setSelectedCategory(selCategory)
  };

  const handleDeleteCategory = (selCategory) => {
    const updatedData = data?.filter((category) => category !== selCategory);
    setData(updatedData);
    dispatch(updateMenuList(updatedData));
    setSelectedCategory(null);
    console.log("after deletion", menuList, updatedData, selectedCategory, selCategory)
  };

  const handleUpdateCategory = () => {
    const updatedData = data?.subCategories?.map((category) =>
     {
      return category.to === selectedCategory.to ? { ...category, name: editCategoryName } : category}
    );
    let test = {...data}
    test.subCategories = updatedData
    console.log("updtaed category", selectedCategory,editCategoryName,data,test)

    setData(test);
    // dispatch(updateMenuList(updatedData));
    // setIsCategoryEditMode(false);
    // setEditCategoryName('');
    // setSelectedCategory(null);
  };

  const handleAddSubcategory = (value) => {
    const newSubCategory = {
      "name" : value.name,
      "to": `/report/${value.name}`
    }
    const updatedData = data?.subCategories?.map((category) =>
      {
        console.log("checking this now",category.to,selectedCategory.to)
        return category.to === selectedCategory.to ? { ...category, report: [...category?.report, newSubCategory] } : category}
    );
    console.log("sub category selected from drop down",data,updatedData,selectedCategory)
    menuListDummy = menuListDummy?.map((category) => 
    category.name === "OOT" ? { ...category,testArray : {...category?.testArray[0], subCategories : updatedData}} : category
 )
 console.log("testing addition",menuList,menuListDummy);
    // setData(updatedData);
    // dispatch(updateMenuList(updatedData));
  };

  const handleEditSubcategory = (subMenu) => {
    console.log("after edit sub", selectedCategory, subMenu,editSubcategoryName)
    setSelectedSubcategory(subMenu)
    setIsSubcategoryEditMode(true);
    setEditSubcategoryName(subMenu?.name);
  };

  const handleDeleteSubcategory = (selSubMenu) => {
    const updatedData = data?.map((category) =>
      category === selectedCategory
        ? { ...category, subMenus: category?.subMenus.filter((submenu) => submenu !== selSubMenu) }
        : category
    );
    let selCategory = updatedData?.find((category) => category.name == selectedCategory.name)
    console.log("delet", updatedData, selectedCategory,selSubMenu)
    setSelectedCategory(selCategory)
    setData(updatedData);
    dispatch(updateMenuList(updatedData));
    setSelectedSubcategory(null);
  };

  const handleUpdateSubcategory = () => {
    const updatedData = data?.map((category) =>
    {
      console.log("submenu sub",  category.name === selectedCategory.name,category,selectedCategory )
      return category.name === selectedCategory.name
      ? {
        ...category,
        subMenus: category?.subMenus?.map((submenu) =>
        {
          return submenu === selectedSubcategory ? { ...submenu, name: editSubcategoryName } : submenu}
        ),
      }
      : category
    }
    
    );
    let selCategory = updatedData?.find((category) => category.name == selectedCategory.name)
    console.log("update sub",selCategory )
    
    setSelectedCategory(selCategory)
    setData(updatedData);
    
    dispatch(updateMenuList(updatedData));
    setIsSubcategoryEditMode(false);
    setEditSubcategoryName('');
    setSelectedSubcategory(null);
  };

  const handleClose = () => {
    setIsCategoryEditMode(false);
    setIsSubcategoryEditMode(false);
    setEditCategoryName('');
    setEditSubcategoryName('');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setAddSubCatActive(false)
    onClose();
  };

  // useEffect(()=>{
  //   const reportObjects = data.find(item => item.component === "Report");
  //   setData(reportObjects)
  // },[menuList])

  const setSelectedExistingCategory = (d) => {
    console.log("testing",d)
  }
  return (
    <Dialog open={true} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Add/Edit (L1) Categories
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {data.subCategories?.map((category) => (
            <ListItem key={category.name}>
              <ListItemText primary={category.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditCategory(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      

        <DialogActions>
          {!isCategoryEditMode && !addSubCatActive && (
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          )}
          {!isCategoryEditMode && !addSubCatActive && (
            <Button variant="contained" color="primary" onClick={(e) => setAddSubCatActive(true)}>
              Add Sub-Category
            </Button>
          )}
        {!isSubcategoryEditMode && addSubCatActive && (
          !selectedCategory ?
            <FormControl fullWidth>
              <InputLabel id="existing-category-label">Select any Category</InputLabel>
              <Select
                labelId="existing-category-label"
                id="existing-category"
                value={data?.subCategories}
                onChange={(e) => {
                  console.log("testing right away",e.target.value)
                  setSelectedCategory(e.target.value)
                }}
                label={data?.name}
              >
                {data?.subCategories?.map((category) => (
                  <MenuItem key={category.name} value={category} >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {/* <Button variant="contained" color="primary" onClick={(e) => setSelectedCategory(e.target.value)}>
              Ok
            </Button> */}
            </FormControl>
            : 
            <FormControl fullWidth>
            <InputLabel id="existing-category-label">Add report under {selectedCategory.name}</InputLabel>
            <Select
              labelId="existing-category-label"
              id="existing-category"
              value={updatedReports}
              title='hi'
              onChange={(e) => handleAddSubcategory(e.target.value)}
            >
              {updatedReports?.map((report) => (

                 <MenuItem key={report.name} value={report}>
                  {report.name}
                </MenuItem>
               
              ))}
             
            </Select>
            {/* <Button variant="contained" color="primary" onClick={(e) => handleAddSubcategory(e.target.value)}>
                Ok
              </Button> */}
            
          </FormControl>
          )}
          {/* {!isSubcategoryEditMode && (
            <Button variant="contained" color="primary" onClick={handleAddSubcategory}>
              Ok
            </Button>
          )} */}
          {isCategoryEditMode ? (
            <>
              <TextField
                label="Edit Category Name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                fullWidth
                margin="dense"
              />
              <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
                <UpdateIcon />
              </Button>
            </>
          ) : (
            selectedCategory && (
              <>
                {/* {!isSubcategoryEditMode && (
                  <Button variant="contained" color="primary" onClick={handleAddSubcategory}>
                    Add Subcategory
                  </Button>
                )} */}
             
              </>
            )
          )}
        </DialogActions>
        {isSubcategoryEditMode && selectedCategory && selectedCategory?.subCategories?.report?.length > 0 && (
          <div>
            <Typography variant="h6">Subcategories:</Typography>
            {isSubcategoryEditMode ? (
                  <>
                    <TextField
                      label="Edit Subcategory Name"
                      value={editSubcategoryName}
                      onChange={(e) => setEditSubcategoryName(e.target.value)}
                      fullWidth
                      margin="dense"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateSubcategory}>
                      <UpdateIcon />
                    </Button>
                  </>
                ) : (
                  selectedSubcategory && (
                    <>
                      <Button variant="contained" color="primary" onClick={handleEditSubcategory}>
                        Edit Subcategory
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleDeleteSubcategory}>
                        Delete Subcategory
                      </Button>
                    </>
                  )
                )}
            <List>
              {selectedCategory.report?.map((submenu) => (
                <ListItem key={submenu?.name}>
                  <ListItemText primary={submenu?.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditSubcategory(submenu)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubcategory(submenu)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditMode;
