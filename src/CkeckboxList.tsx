import * as React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

export default function CheckboxList() {
  const [checked, setChecked] = useState([0]);

  const [toDolist, setTodolist] = useState<string[]>([
    "string",
    "string",
    "string",
  ]);
  const [inputValue, setInputValue] = useState("");

  //   const toDoListRender = toDolist.map((item, index) => {
  //     return <li key={index}>{item}</li>;
  //   });

  function addItemToList(event: any) {
    const newToDoList = toDolist;
    newToDoList.push(inputValue);
    setTodolist([...newToDoList]);
  }

  //   const handleToggle = (value: number) => () => {
  //     const currentIndex = checked.indexOf(value);
  //     const newChecked = [...checked];

  //     if (currentIndex === -1) {
  //       newChecked.push(value);
  //     } else {
  //       newChecked.splice(currentIndex, 1);
  //     }

  //     setChecked(newChecked);
  //   };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={addItemToList}> submit</button>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {toDolist.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                role={undefined}
                //   onClick={handleToggle(value)}
                dense
              >
                {/* <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon> */}
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
