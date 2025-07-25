import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FormControlLabel, List, ListItem } from "@mui/material";
import { ListItemText } from "@material-ui/core";
import { useSelector } from "react-redux";

const CategoryModal = ({
  updateCategory,
  addNewCategory,
  selectedButton,
  categoryObj,
  onSave,
  onClose,
}) => {
  const [category, setCategory] = useState(categoryObj.name);
  const [isOpen, setIsOpen] = useState(true);
  const [categoryStatus, setCategoryStatus] = useState(null);
  const [includeReports, setIncludeReports] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subcategory, setSubcategory] = useState("");

  const [reports, setReports] = useState([]);

  const updatedReports = useSelector(
    (state) => state.reportReducer.updatedReports
  );

  const handleSave = () => {
    setCategory("");
    setCategoryStatus(null);
    setSubcategory("");
    setSubcategoryStatus(null);
    setReports([]);
    setIncludeReports(true);
    onClose();
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Clear fields and close modal
    setCategory("");
    setCategoryStatus(null);
    setSubcategory("");
    setSubcategoryStatus(null);
    setReports([]);
    setIncludeReports(true);
    onClose();
    setIsOpen(false);
  };

  const setSubcategoryStatus = (value) => {
    let subCategoryObj = {
      name: subcategory,
      reports: reports,
      exact: true,
      to: "/report/",
      iconClassName: "bi bi-file-earmark",
      component: "Report",
      isOpen: false,
    };

    let categoryObject = {
      name: category,
      subCategories: subcategory == "" ? [] : [subCategoryObj],
      exact: true,
      to: "/report/*",
      iconClassName: "bi bi-file-earmark",
      component: "Report",
      reports: subcategory == "" ? reports : [],
    };

    let subCategoryObjCopy = categoryObj?.subCategories
      ? structuredClone(categoryObj.subCategories)
      : [];
    let reportsCopy = categoryObj?.reports
      ? structuredClone(categoryObj.reports)
      : [];
    let t = structuredClone(reportsCopy);
    let error = {
      manualError: "",
      jsError: "",
    };
    if (
      selectedButton === "report" ||
      (selectedButton === "subCategory" && subcategory == "")
    ) {
      // Filter out reports that already exist in the reportsCopy
      const newReports = reports.filter(
        (report) =>
          !reportsCopy.some((existingReport) => existingReport.id === report.id)
      );

      if (newReports.length == 0) {
        error.manualError = "Report added already exist try adding new report!";
        console.log("con1", newReports, error);
      } else {
        try {
          reportsCopy?.push(...newReports);
          console.log("newReports", reportsCopy, t, t.push(...newReports));
        } catch (err) {
          console.log("Error", err);
          error.jsError = err.message;
        }
      }
    }

    if (selectedButton === "subCategory" && subCategoryObj?.name !== "") {
      // Check if subcategory with the same name already exists
      const existingSubCategory = subCategoryObjCopy.find(
        (subCategory) => subCategory.name === subCategoryObj.name
      );

      if (!existingSubCategory) {
        try {
          subCategoryObjCopy?.push(subCategoryObj);
        } catch (err) {
          console.log("Error", err);
          error.jsError = err.message;
        }
      } else {
        error.manualError = `Subcategory with name '${subCategoryObj.name}' already exists.`;
        console.log(
          `Subcategory with name '${subCategoryObj.name}' already exists.`
        );
      }
    }

    categoryObj = {
      ...categoryObj,
      subCategories: subCategoryObjCopy,
      reports: reportsCopy,
      error: error,
    };
    console.log("con", categoryObj);

    if (selectedButton == "category" && category != undefined) {
      addNewCategory(categoryObject);
    } else {
      updateCategory(categoryObj);
    }
  };

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          width: "90%",
          //   maxWidth: '600px', // Adjust as needed
          maxHeight: "80%",
          overflow: "scroll",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "1px solid #ccc",
          borderRadius: "8px",
          p: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
          <IconButton onClick={() => setCategoryStatus("correct")}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={() => setCategoryStatus("wrong")}>
            <HighlightOffIcon />
          </IconButton>
        </div>

        <>
          {(selectedButton == "subCategory" ||
            selectedButton == "category") && (
            <div
              style={{
                marginLeft: "16px",
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => setSubcategoryStatus("correct")}>
                <CheckCircleOutlineIcon />
              </IconButton>
              <IconButton onClick={() => setSubcategoryStatus("wrong")}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          )}

          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              marginLeft: "32px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="reports-label">Reports</InputLabel>
              <Select
                labelId="reports-label"
                id="reports"
                multiple
                value={reports}
                onChange={(e) => setReports(e.target.value)}
                input={<Input />}
                renderValue={(selected) =>
                  `Selected ${selected.length} reports`
                }
              >
                {updatedReports?.length > 0 &&
                  updatedReports?.map((report) => (
                    <MenuItem key={report} value={report}>
                      <Checkbox
                        checked={reports.includes(report)}
                        color="primary"
                      />
                      <ListItemText primary={report.name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <IconButton onClick={() => setSubcategoryStatus("correct")}>
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => setSubcategoryStatus("wrong")}>
              <HighlightOffIcon />
            </IconButton>
          </div>

          {reports.length > 0 && (
            <Box
              sx={{ marginLeft: "32px", marginBottom: "16px", maxWidth: "93%" }}
            >
              <List>
                {reports.map((report) => (
                  <ListItem
                    key={report.id}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      padding: "8px",
                    }}
                  >
                    <ListItemText primary={report.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </>

        <Box
          sx={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "flex-end",
            position: "sticky",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginLeft: "8px" }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "8px" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
