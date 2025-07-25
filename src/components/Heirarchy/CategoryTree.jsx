import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoryAccordion = ({ category, onDelete, onEdit, onAddSubcategory, reportOptions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);
  const [selectedReport, setSelectedReport] = useState('');

  const handleEdit = () => {
    onEdit(category, editedName);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(category);
  };

  const handleAddSubcategory = () => {
    onAddSubcategory(category, selectedReport);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {isEditing ? (
          <TextField
            label="Category Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <Typography>{category.name}</Typography>
        )}
        <div style={{ marginLeft: 'auto' }}>
          {isEditing ? (
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Save
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth variant="outlined" style={{ marginRight: '10px' }}>
          <InputLabel id={`select-report-label-${category.name}`}>Select Report</InputLabel>
          <Select
            labelId={`select-report-label-${category.name}`}
            id={`select-report-${category.name}`}
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            label="Select Report"
          >
            {reportOptions.map((report) => (
              <MenuItem key={report.name} value={report.name}>
                {report.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={handleAddSubcategory}>
          Add Subcategory
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

const CategoryTree = ({ categories, onDelete, onEdit, onAddSubcategory, reportOptions }) => {
  return (
    <div>
      {categories.map((category) => (
        <CategoryAccordion
          key={category.name}
          category={category}
          onDelete={onDelete}
          onEdit={onEdit}
          onAddSubcategory={onAddSubcategory}
          reportOptions={reportOptions}
        />
      ))}
    </div>
  );
};

const YourComponent = () => {
  const [categories, setCategories] = useState([
    // Your categories array goes here
  ]);

  const [reportOptions] = useState([
    // Your report objects go here
  ]);

  const handleDelete = (category) => {
    // Handle delete logic
    const updatedCategories = categories.filter((c) => c.name !== category.name);
    setCategories(updatedCategories);
  };

  const handleEdit = (category, newName) => {
    // Handle edit logic
    const updatedCategories = categories.map((c) =>
      c.name === category.name ? { ...c, name: newName } : c
    );
    setCategories(updatedCategories);
  };

  const handleAddSubcategory = (category, selectedReport) => {
    // Handle add subcategory logic
    const newSubcategory = {
      name: selectedReport,
      subCategories: [],
    };
    const updatedCategories = categories.map((c) =>
      c.name === category.name ? { ...c, subCategories: [...c.subCategories, newSubcategory] } : c
    );
    setCategories(updatedCategories);
  };

  return (
    <Container>
      <CategoryTree
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddSubcategory={handleAddSubcategory}
        reportOptions={reportOptions}
      />
    </Container>
  );
};

export default YourComponent;
