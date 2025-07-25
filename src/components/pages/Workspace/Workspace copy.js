import React, { useEffect, useMemo, useRef, useState } from "react";
// import { NavLink, Link } from "react-router-dom";
import { getAllWorkspaces, getMyOrgWorkspaces, getReportEmbedUrl, isTokenExpired, login, workspacesDummy } from "../../../utils";
// import {Button, TextField} from '@material-ui/core';

// const Workspace = (props) => {
//   const { name, subMenus, iconClassName, onClick, to, exact } = props;
//   const [expand, setExpand] = useState(false);
//   const [workspaces, setWorkspaces] = useState([])

//   useEffect(()=>{
//     let ans = getAllWorkspaces().then((data)=>{ 
//     //  console.log("all workspaces data", data.value) 
//      setWorkspaces(data.value)
//      return data
//    }) 
//   //  console.log("all data out", ans)
//      },[])

//      console.log("all workspaces out", workspaces)
//   return (
//     <>
//     <h1>Workspace</h1>
//     <div>
//       {/* {workspaces && workspaces[0]?.id}
//       {workspaces && workspaces.map((menu, index) => (
//             // <li key={index}>
//             //   {menu.name}
//             // </li>
//             <option
//         key={index}
//         value={menu.name}>
//         {menu.name}
//     </option>
//           ))} */}
//           {workspaces?.length > 0
//           ? <div>
//               <table className="centerTable" style={{marginTop: 20}}>
//                 <thead>
//                   <tr>
//                     <th>Task</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 {workspaces.map ((object, i) => {
//                   return (
//                     <tbody>
//                       <tr>
//                         <td>
//                           {/* {object.is_editing */}
//                              <TextField
//                                 id="standard-basic"
//                                 value={object.name}
//                                 // onChange={e => this.editTask (e.target.value)}
//                               />
//                             {/* : object.is_done */}
//                                 {/* ? <s>{object.name}</s>
//                                 : <span>{object.name}</span>} */}
//                         </td>
//                         <td>
//                           {/* {object.is_editing ? */}
//                            <div>
//                                 <Button
//                                   className="button_style"
//                                   variant="outlined"
//                                   color="primary"
//                                   size="small"
//                                   // disabled={this.state.edit_task == ''}
//                                   // onClick={e => this.saveEditTask (object)}
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   className="button_style"
//                                   variant="outlined"
//                                   color=""
//                                   size="small"
//                                   onClick={e => this.edit (object)}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </div>
//                             {/* : <div>
//                                 <Button
//                                   className="button_style"
//                                   variant="outlined"
//                                   color="primary"
//                                   size="small"
//                                   onClick={e => this.edit (object)}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button
//                                   className="button_style"
//                                   variant="outlined"
//                                   color="secondary"
//                                   size="small"
//                                   disabled={object.is_done}
//                                   onClick={e => this.done (object)}
//                                 >
//                                   Done
//                                 </Button>
//                                 <Button
//                                   className="button_style"
//                                   variant="outlined"
//                                   size="small"
//                                   onClick={e => this.delete (object)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </div>} */}
//                         </td>
//                       </tr>
//                     </tbody>
//                   );
//                 })}
//               </table>
//             </div>
//           : <h2>Nothing to do!</h2>}
      
//     </div>
//     </>
//   );
// };

// export default Workspace;

// import * as React from 'react';
// import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


function createData(
  id,
  name,
  datasetId,
  isOnDedicatedCapacity
  // calories,
  // fat,
  // carbs,
  // protein,
) {
  return {
    id,
    name,
    datasetId,
    isOnDedicatedCapacity
    // calories,
    // fat,
    // carbs,
    // protein,
  };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// type Order = 'asc' | 'desc';

function getComparator(
  order,
  orderBy,
)  {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}




// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// interface HeadCell {
//   disablePadding: boolean;
//   id: keyof Data;
//   label: string;
//   numeric: boolean;
// }

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'datasetId',
    numeric: true,
    disablePadding: false,
    label: 'Dataset Id',
  },
  {
    id: 'isOnDedicatedCapacity',
    numeric: true,
    disablePadding: false,
    label: 'Is On Dedicated Capacity',
  }
  // {
  //   id: 'carbs',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Carbs (g)',
  // },
  // {
  //   id: 'protein',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Protein (g)',
  // },
];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
   
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : ( */}
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Selecte Workspace from following options
        </Typography>
      {/* )} */}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function Workspace(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(props?.selId);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [workspaces, setWorkspaces] = useState(workspacesDummy())

  const {workspaces} =  props
     let rows = workspaces && workspaces.map((item,index)=>{
      return createData(index,item.name,item.id,item.isOnDedicatedCapacity)
     })



  const handleRequestSort = (
    event,
    property
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected(0);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected;
    let newSelected = [];

    setSelected(id);

    const selectedItems = rows && rows[id]?.datasetId;
      sessionStorage.setItem("selectedWorkspaces",selectedItems)
      props.handleSelectedWorkspace(rows[id]?.datasetId,id)
    props.handleSelectedWorkspace(selectedItems)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => id == selected ? 1 : 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <>
    <h1>Workspace</h1>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected?.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.datasetId}</TableCell>
                    <TableCell align="center">{row.isOnDedicatedCapacity? "True":"False"}</TableCell>
                    {/* <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
    </>
  );
}