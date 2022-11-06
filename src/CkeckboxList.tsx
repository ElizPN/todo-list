import * as React from "react";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom/Zoom";

interface Item {
  text: string;
  checked: boolean;
  removing: boolean;
}

function removeItem(arr: Item[], num: number) {
  const arrClone = [...arr];
  const partBeforeItem = arrClone.slice(0, num);
  const partAfterItem = arrClone.slice(num + 1);
  const arrConcat = [...partBeforeItem, ...partAfterItem];

  return arrConcat;
}

function toggleProperty(arr: Item[], itemIndex: number) {
  const copyArr = [...arr];
  copyArr[itemIndex].checked = !copyArr[itemIndex].checked;

  return copyArr;
}

function toggleRemoveProperty(arr: Item[], itemIndex: number) {
  const copyArr = [...arr];
  copyArr[itemIndex].removing = !copyArr[itemIndex].removing;

  return copyArr;
}

export default function CheckboxList() {
  const [toDolist, setTodolist] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [deletedItem, setDeletedItem] = useState<any>();

  function addItemToList(event: any) {
    let newToDoList = [...toDolist];
    newToDoList.push({ text: inputValue, checked: false, removing: false });
    setTodolist(newToDoList);
    setInputValue("");
  }

  function handleRemoveItem(itemIndex: any) {
    const arrWithToggleChecked = toggleRemoveProperty(toDolist, itemIndex);
    setTodolist(arrWithToggleChecked);
  }

  function handleDelteItemFromState(itemIndex: any) {
    const arrWithoutItem = removeItem(toDolist, itemIndex);
    setTodolist(arrWithoutItem);
  }

  function handleToggle(itemIndex: any) {
    const arrWithToggleChecked = toggleProperty(toDolist, itemIndex);
    setTodolist(arrWithToggleChecked);
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: "100vh" }}
    >
      <Box>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={addItemToList}> submit</button>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {toDolist.map((item, index) => {
            return (
              <ListItem disablePadding>
                <Zoom
                  in={!item.removing}
                  timeout={800}
                  onExited={() => handleDelteItemFromState(index)}
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={item.checked}
                        tabIndex={-1}
                        disableRipple
                        onClick={(event: any) => handleToggle(index)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />

                    <IconButton
                      onClick={(event: any) => handleRemoveItem(index)}
                    >
                      remove
                    </IconButton>
                  </ListItemButton>
                </Zoom>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Grid>
  );
}
