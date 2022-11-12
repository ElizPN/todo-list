import * as React from "react";
import { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
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
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const Theme = {
  palette: {
    primary: {
      main: "#3f50b5",
    },
    secondary: {
      main: "#f44336",
    },
  },
};

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
  paddingBottom: "20px",
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

  const theme = createTheme(Theme);

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
    let newToDoList = [...toDolist];
    newToDoList[itemIndex].text = inputEditItem;
    newToDoList[itemIndex].editItem = !newToDoList[itemIndex].editItem;

    setTodolist(newToDoList);

    // setInputEditItem("");
  }

  return (
    <ThemeProvider theme={theme}>
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

          {toDolist.map((item, index) => (
            <Grid container spacing={2}>
              <Zoom
                in={!item.removing}
                timeout={800}
                onExited={() => handleDelteItemFromState(index)}
              >
                <ListItemButton role={undefined} dense>
                  <Grid item xs={1}>
                    <Checkbox
                      edge='start'
                      checked={item.checked}
                      tabIndex={-1}
                      disableRipple
                      onClick={(event: any) => handleToggleCheked(index)}
                    />
                  </Grid>
                  {item.editItem ? (
                    <>
                      <Grid item xs={9}>
                        <input
                          value={inputEditItem}
                          onChange={(event) =>
                            setInputEditItem(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <SaveIcon
                          color='secondary'
                          onClick={(event: any) => handlerSaveItem(index)}
                        ></SaveIcon>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={9}>
                        <ListItemText
                          primary={item.text}
                          sx={{ overflow: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <CreateIcon
                          sx={{ paddingTop: "25px" }}
                          color='primary'
                          onClick={(event: any) => handleEditItem(index)}
                        ></CreateIcon>
                      </Grid>
                      <Grid item xs={1}>
                        <DeleteIcon
                          sx={{ paddingTop: "25px" }}
                          color='primary'
                          onClick={(event: any) => handleRemoveItem(index)}
                        ></DeleteIcon>
                      </Grid>
                    </>
                  )}
                </ListItemButton>
              </Zoom>
            </Grid>
          ))}
        </StyledPaper>
      </Grid>
    </ThemeProvider>
  );
}
