import React, { useEffect, useState } from "react";
import "./TreeView.scss";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, ListItemText, MenuItem } from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CategoryModal from "./CategoryCreation";
import LongMenu from "./VertIcon";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { updateMenuList } from "../../features/menuList/menuListSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorModal from "../ErrorModal";

const DraggableCategory = ({
  setIsErrorModalOpen,
  setManualErrorMessage,
  setJsErrorMessage,
  manualErrorMessage,
  category,
  index,
  categories,
  setCategories,
  handleDelete,
  addNewCategory,
  updateCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedButton, setSelectedButton] = useState("");
  const [openSubCategories, setOpenSubCategories] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [categoryDropdownState, setCategoryDropdownState] = useState(false);
  const [subCategoryDropdownState, setSubCategoryDropdownState] = useState(
    category?.setOpenSubCategories
  );

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const updatedCategories = [...categories];
    const [draggedCategory] = updatedCategories.splice(draggedIndex, 1);
    updatedCategories.splice(index, 0, draggedCategory);
    setCategories(updatedCategories);
  };

  const handleSubCategoryClick = (subcategoryName, event) => {
    setOpenSubCategories(!openSubCategories);
    setShowMenu(false);
  };

  const handleSubCategoryDeletion = (subIndex) => {
    try {
          let tempSubCategoryVar = structuredClone(subCategoryDropdownState)
          let updateCategory = structuredClone([...categories])
          tempSubCategoryVar?.splice(subIndex, 1)
          updateCategory[index].subCategories = tempSubCategoryVar
          setCategories(updateCategory)
        } catch (err) {
           console.log("err",err);
           setJsErrorMessage(err)
           setIsErrorModalOpen()
        }             
  }

  useEffect(() => {
    if (manualErrorMessage) {
      const timer = setTimeout(() => {
        setManualErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [manualErrorMessage]);

  useEffect(() => {
    setSubCategoryDropdownState(category?.subCategories);
  }, [category?.subCategories]);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="category-item"
    >
      <div key={index} className="category-header">
        {category.name}
        <div className="icon-container">
          <span
            className="icon"
            onClick={() => setCategoryDropdownState(!categoryDropdownState)}
          >
            {!categoryDropdownState ? (
              <ArrowDropDownOutlinedIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
            {/* Your existing LongMenu component or icon */}
          </span>
          <LongMenu handleDelete={() => handleDelete(category)} />
        </div>
      </div>
      {/* ... Rest of your category item code ... */}
      {isModalOpen && (
        <CategoryModal
          updateCategory={(categoryObj) => updateCategory(categoryObj)}
          addNewCategory={(categoryObj) => addNewCategory(categoryObj)}
          selectedButton={selectedButton}
          categoryObj={selectedCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div style={{ display: categoryDropdownState ? "contents" : "none" }}>
        {true && (
          <div className="category-report-container">
            {category?.reports?.map((report, reportIndex) => (
              <div key={reportIndex} className="report-item">
                {report?.name}
              </div>
            ))}
          </div>
        )}
        {true && (
          <div className="subcategory-container">
            {subCategoryDropdownState?.map((subCategory, subIndex) => (
              <div key={subIndex} className="subcategory-item">
                <div
                  className="subcategory-header"
                  onClick={(event) =>
                    handleSubCategoryClick(subCategory?.name, event)
                  }
                >
                  {subCategory?.name}
                  <div className="icon-container">
                    <span
                      className="icon"
                      onClick={() => {
                        console.log("hey checking");

                        setSubCategoryDropdownState(
                          subCategoryDropdownState?.map((item) =>
                            item.name === subCategory.name
                              ? { ...item, isOpen: !item.isOpen }
                              : item
                          )
                        );
                      }}
                    >
                      {subCategory.isOpen ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownOutlinedIcon />
                      )}
                    </span>
                    <LongMenu
                      handleDelete={() => handleSubCategoryDeletion(subIndex)
                        // {
                        //   try {
                        //     subCategoryDropdownState?.splice(subIndex, 1)
                        //   } catch (err) {
                        //     console.log("err",err);
                        //   }
                        // }
                      }
                    />
                  </div>
                </div>
                {true && (
                  <div
                    className="report-container"
                    style={{
                      display: subCategory?.isOpen ? "contents" : "none",
                    }}
                  >
                    {subCategory?.reports?.map((report, reportIndex) => (
                      <div key={reportIndex} className="report-item">
                        {report?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* {manualErrorMessage ? (<div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "red", paddingTop: "8px" }}>{manualErrorMessage}</p>
              <IconButton onClick={() => setManualErrorMessage('')}>
                <HighlightOffIcon />
              </IconButton>
            </div>
            ) : (<></>)} */}
            <div className="button-container">
              <button
                className="add-report-button"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedCategory(category);
                  setSelectedButton("subCategory");
                }}
              >
                <AddCircleOutlineRoundedIcon />
                Add Subcategory
              </button>
              <button
                className="add-subcategory-button"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedCategory(category);
                  setSelectedButton("report");
                }}
              >
                <AddCircleOutlineRoundedIcon />
                Add Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ListPage = () => {
  const workspaces = useSelector((state) => state.workspaceReducer.workspaces);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState(workspaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedButton, setSelectedButton] = useState("");
  const [manualErrorMessage, setManualErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [jsErrorMessage, setJsErrorMessage] = useState("");
  const menuList = useSelector((state) => state.menuListReducer.menuItems);
  const heirarchy = {
    name: "Hierarchy",
    categories: [...menuList.slice(2)],
  };

  const [heirarchyObject, setHeirarchyObj] = useState(heirarchy);

  const [categories, setCategories] = useState(heirarchyObject.categories);
  const dispatch = useDispatch();

  const updateCategory = (categoryObj) => {
    // Find the index of the "Supply Chain" category in the main object
    const categoryIndex = heirarchyObject?.categories?.findIndex(
      (category) => category.name === categoryObj.name
    );

    if (categoryObj?.error) {
      setManualErrorMessage(categoryObj.error?.manualError);
      setIsErrorModalOpen(true);
    }
    if (categoryIndex !== -1) {
      // Update the "Supply Chain" category with the new object
      let tempObj = { ...heirarchyObject };
      tempObj.categories[categoryIndex] = categoryObj;
      setHeirarchyObj(tempObj);
      setCategories(tempObj?.categories);
      // setSubCategoryDropdownState(tempObj?.categories?.subCategories)
    }
  };

  const addNewCategory = (categoryObj) => {
    let tempObj = { ...heirarchyObject };
    const existingCategory = tempObj?.categories?.find(
      (category) => category?.name === categoryObj?.name
    );

    if (!existingCategory) {
      try {
        tempObj.categories.push(categoryObj);
        setHeirarchyObj(tempObj);
        setCategories(tempObj.categories);
      } catch(err) {
        setJsErrorMessage(err)
        setIsErrorModalOpen(true)
      }   
    } else {
      setManualErrorMessage(
        `Category with name '${categoryObj.name}' already exists.`
      );
    }
  };

  const saveChanges = () => {
    try{
      let tempObj = [...menuList];
      tempObj.slice(0, 2);
      let a1 = [...tempObj.slice(0, 2), ...categories];
      console.log("check", tempObj.slice(0, 2), categories, a1);
      let obj = {
        name: "Hierarchy",
        categories: [...categories],
      };
      setHeirarchyObj(obj);
      setCategories(obj.categories);
      dispatch(updateMenuList(a1));
    }
    catch (err) {
      setJsErrorMessage(err)
      setIsErrorModalOpen(true)
    }
   
  };

  const handleDelete = (categoryObj) => {
    try {
      console.log(
        "from outer",
        categories.filter((category) => category.name !== categoryObj.name)
      );
      let filteredCat = categories.filter(
        (category) => category.name !== categoryObj.name
      );
      let heirarchy = {
        name: "Hierarchy",
        categories: filteredCat,
      };
      setCategories(
        categories.filter((category) => category.name !== categoryObj.name)
      );
      setHeirarchyObj(heirarchy);
    } catch (err) {
      console.log("Js error", err);
      setJsErrorMessage(err);
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    if (manualErrorMessage) {
      const timer = setTimeout(() => {
        setManualErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [manualErrorMessage]);

  return (
    <div className="admin-container">
      {isErrorModalOpen && (
        <ErrorModal
          errorMessage={jsErrorMessage}
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
      <h1>Add/Edit Categories & Sub-categories for reports</h1>
      <h3> Workspaces : </h3>
      <div className="select-workspaces">
        {/* ... Your existing workspace selection code ... */}

        <FormControl fullWidth>
          {/* <InputLabel id="workspaces-label">Select Workspaces</InputLabel> */}
          <InputLabel
            id="workspaces-label"
            shrink={selectedWorkspaces.length > 0}
            sx={{ padding: "10px" }}
          >
            {selectedWorkspaces.length > 0 ? "" : "Select Workspaces"}
          </InputLabel>
          <Select
            labelId="workspaces-label"
            id="workspaces"
            multiple
            value={selectedWorkspaces}
            onChange={(e) => setSelectedWorkspaces(e.target.value)}
            input={<Input />}
            renderValue={(selected) =>
              `Selected Workspaces : ${selected
                ?.map((item) => item.name)
                ?.join(", ")}`
            }
            sx={{
              padding: "10px",
            }}
          >
            {workspaces.map((workspace) => (
              <MenuItem key={workspace} value={workspace}>
                <Checkbox
                  checked={selectedWorkspaces.includes(workspace)}
                  color="primary"
                />
                <ListItemText primary={workspace.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <h3> Categories : </h3>
      <div className="list-container">
        {categories.length == 0 && (
          <div style={{ border: "1px solid grey", padding: "15px" }}>
            <h4>
              No category has been created. Please create one by using the 'Add
              Category' button.
            </h4>
          </div>
        )}
        {manualErrorMessage ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ color: "red", paddingTop: "8px" }}>
              {manualErrorMessage}
            </p>
            <IconButton onClick={() => setManualErrorMessage("")}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
        {categories.map((category, index) => (
          <DraggableCategory
            key={index}
            category={category}
            index={index}
            categories={categories}
            setCategories={setCategories}
            updateCategory={(categoryObj) => updateCategory(categoryObj)}
            addNewCategory={(categoryObj) => addNewCategory(categoryObj)}
            heirarchy={heirarchy}
            handleDelete={(categoryObj) => handleDelete(categoryObj)}
            manualErrorMessage={manualErrorMessage}
            setIsErrorModalOpen={() => setIsErrorModalOpen(true)}
            setManualErrorMessage={(val) => setManualErrorMessage(val)}
            setJsErrorMessage={(val) => setJsErrorMessage(val)}

          />
        ))}
      </div>
      {isModalOpen && (
        <CategoryModal
          updateCategory={(categoryObj) => updateCategory(categoryObj)}
          addNewCategory={(categoryObj) => addNewCategory(categoryObj)}
          selectedButton={selectedButton}
          categoryObj={selectedCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className="add-category-button"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedButton("category");
            setSelectedCategory({});
          }}
        >
          <AddCircleOutlineRoundedIcon /> &nbsp; Add Category
        </button>
        <div>
          <button className="add-category-button" onClick={() => saveChanges()}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
