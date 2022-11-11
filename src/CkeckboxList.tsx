import * as React from "react";
import { useEffect, useState } from "react";
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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";

interface Item {
  text: string;
  checked: boolean;
  removing: boolean;
  editItem: boolean;
}

function removeItem(arr: Item[], num: number) {
  const arrClone = [...arr];
  const partBeforeItem = arrClone.slice(0, num);
  const partAfterItem = arrClone.slice(num + 1);
  const arrConcat = [...partBeforeItem, ...partAfterItem];

  return arrConcat;
}

function toggleCheckedProperty(arr: Item[], itemIndex: number) {
  const copyArr = [...arr];
  copyArr[itemIndex].checked = !copyArr[itemIndex].checked;

  return copyArr;
}

function toggleRemoveProperty(arr: Item[], itemIndex: number) {
  const copyArr = [...arr];
  copyArr[itemIndex].removing = !copyArr[itemIndex].removing;

  return copyArr;
}

function toggleEditProperty(arr: Item[], itemIndex: number) {
  const copyArr = [...arr];

  for (let i = 0; i < copyArr.length; i++) {
    copyArr[i].editItem = i === itemIndex ? !copyArr[i].editItem : false;
  }
  return copyArr;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "700px",
  lineHeight: "60px",
  padding: "100px",
  backgroundColor: "#FBEBE7",
}));

const SyledFieldArea = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const SyledTextItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export default function CheckboxList() {
  const [toDolist, setTodolist] = useState<Item[]>(
    JSON.parse(localStorage.getItem("toDolist") || "{}")
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [inputEditItem, setInputEditItem] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("toDolist", JSON.stringify(toDolist));
  }, [toDolist]);

  function addItemToList(event: any) {
    let newToDoList = [...toDolist];
    newToDoList.push({
      text: inputValue,
      checked: false,
      removing: false,
      editItem: false,
    });
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

  function handleToggleCheked(itemIndex: any) {
    const arrWithToggleChecked = toggleCheckedProperty(toDolist, itemIndex);
    setTodolist(arrWithToggleChecked);
  }

  function handleEditItem(itemIndex: any) {
    const arrWithToggledEditProp = toggleEditProperty(toDolist, itemIndex);
    setTodolist(arrWithToggledEditProp);
    setInputEditItem(toDolist[itemIndex].text);
  }

  function handlerSaveItem(itemIndex: any) {
    console.log("test");

    let newToDoList = [...toDolist];
    newToDoList[itemIndex].text = inputEditItem;

    setTodolist(newToDoList);
    console.log(inputEditItem);

    // setInputEditItem("");
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: "100vh",
      }}
    >
      <StyledPaper variant='outlined' square>
        <SyledFieldArea>
          <TextField
            size='small'
            label='Let`s go!'
            color='primary'
            focused
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            sx={{ width: "90%" }}
          />
          <Button
            variant='outlined'
            onClick={addItemToList}
            sx={{ ml: 2, width: "10%" }}
          >
            Add
          </Button>
        </SyledFieldArea>

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#FBEBE7",
          }}
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
                        onClick={(event: any) => handleToggleCheked(index)}
                      />
                    </ListItemIcon>

                    {item.editItem ? (
                      <Box>
                        <input
                          value={inputEditItem}
                          onChange={(event) =>
                            setInputEditItem(event.target.value)
                          }
                        />
                        <SaveIcon
                          onClick={(event: any) => handlerSaveItem(index)}
                        ></SaveIcon>
                      </Box>
                    ) : (
                      <SyledTextItem>
                        <ListItemText
                          primary={item.text}
                          sx={{ overflow: "auto" }}
                        />
                        <CreateIcon
                          onClick={(event: any) => handleEditItem(index)}
                        ></CreateIcon>
                      </SyledTextItem>
                    )}

                    <DeleteIcon
                      color='primary'
                      onClick={(event: any) => handleRemoveItem(index)}
                    ></DeleteIcon>
                  </ListItemButton>
                </Zoom>
              </ListItem>
            );
          })}
        </List>
      </StyledPaper>
    </Grid>
  );
}
