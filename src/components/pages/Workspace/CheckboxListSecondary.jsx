import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from 'react-redux';


export default function CheckboxListSecondary(props) {
  const selWorkspaces = useSelector((state) => state.workspaceReducer.selWorkspaces)
  const [checked, setChecked] = React.useState(selWorkspaces || []);
  // const [dr, setList] = useState(props.list || []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.selectedWorkspaces(newChecked)
    console.log("selected checked workspaces", newChecked)
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Dragged outside the list, do nothing
    }

    const updatedList = Array.from(props.list);
    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);
    props.updateReportSequence(updatedList)
    setChecked(updatedList);
    console.log("props",props)
  };

  return (

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List
            dense
            sx={{
              width: '100%',
              maxHeight: '50vh',
              overflowY: 'auto',
              overflow: 'scroll',
              bgcolor: 'background.paper',
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.list?.map((value, index) => (
              <Draggable key={value.id} draggableId={value.id} index={index}>
                {(provided) => (
                  <ListItem
                    disablePadding
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value.id}`}
                          src={`/static/images/avatar/${value}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${value.name}`}
                        id={`checkbox-list-secondary-label-${value.id}`}
                      />
                      {props.enableCheckbox && (
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${value.id}` }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
    // <List dense sx={{ width: '100%', maxHeight: "50vh", overflowY: "auto", overflow: "scroll", bgcolor: 'background.paper' }}>
    //   {props.list?.map((value) => {
    //     const labelId = `checkbox-list-secondary-label-${value.id}`;
    //     return (
    //       <ListItem
    //         key={value.id}
    //         secondaryAction={
    //           props.enableCheckbox && <Checkbox
    //             edge="end"
    //             onChange={handleToggle(value)}
    //             checked={checked.indexOf(value) !== -1}
    //             inputProps={{ 'aria-labelledby': labelId }}
    //           />
    //         }
    //         disablePadding
    //         // draggable={true}
    //       >
    //         <ListItemButton>
    //           <ListItemAvatar>
    //             <Avatar
    //               alt={`Avatar n°${value.id}`}
    //               src={`/static/images/avatar/${value}.jpg`}
    //             />
    //           </ListItemAvatar>
    //           <ListItemText id={labelId} primary={`${value.name}`} />
    //         </ListItemButton>
    //       </ListItem>
    //     );
    //   })}
    // </List>
  );
}