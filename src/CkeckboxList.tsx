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
import { stringify } from "querystring";

function removeItem(arr: Item[], num: number) {
  const arrClone = [...arr];
  const partBeforeItem = arrClone.slice(0, num);
  const partAfterItem = arrClone.slice(num + 1);
  const arrConcat = [...partBeforeItem, ...partAfterItem];

  return arrConcat;
}

interface Item {
  text: string;
  checked: boolean;
}

export default function CheckboxList() {
  const [checked, setChecked] = useState([0]);

  const [toDolist, setTodolist] = useState<Item[]>([
    { text: "", checked: false },
  ]);
  const [inputValue, setInputValue] = useState<string>("");

  function addItemToList(event: any) {
    let newToDoList = [...toDolist];
    newToDoList.push({ text: inputValue, checked: false });
    setTodolist(newToDoList);
    setInputValue("");
    console.log(toDolist);
  }

  function handleRemoveItem(itemIndex: any) {
    const arrWithoutItem = removeItem(toDolist, itemIndex);
    setTodolist(arrWithoutItem);
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
                <ListItemText id={labelId} primary={value.text} />
                <IconButton onClick={(event: any) => handleRemoveItem(index)}>
                  remove
                </IconButton>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
