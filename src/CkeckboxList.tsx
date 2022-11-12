import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AddTodoItem } from "./AddTodoItem";
import { TodoItem } from "./TodoItem";

export interface Item {
  text: string;
  checked: boolean;
  removing: boolean;
  editItem: boolean;
}
// TodoItem
const removeItem = (arr: Item[], num: number) => {
  const arrClone = [...arr];
  const partBeforeItem = arrClone.slice(0, num);
  const partAfterItem = arrClone.slice(num + 1);
  const arrConcat = [...partBeforeItem, ...partAfterItem];

  return arrConcat;
};
// TodoItem
const toggleCheckedProperty = (arr: Item[], itemIndex: number) => {
  const copyArr = [...arr];
  copyArr[itemIndex].checked = !copyArr[itemIndex].checked;

  return copyArr;
};
//  TodoItem
const toggleRemoveProperty = (arr: Item[], itemIndex: number) => {
  const copyArr = [...arr];
  copyArr[itemIndex].removing = !copyArr[itemIndex].removing;

  return copyArr;
};
//  TodoItem
const toggleEditProperty = (arr: Item[], itemIndex: number) => {
  const copyArr = [...arr];

  for (let i = 0; i < copyArr.length; i++) {
    copyArr[i].editItem = i === itemIndex ? !copyArr[i].editItem : false;
  }
  return copyArr;
};

const Theme = {
  palette: {
    primary: {
      main: "#3f50b5",
    },
    secondary: {
      main: "#388e3c",
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

export default function CheckboxList() {
  const [toDolist, setTodolist] = useState<Item[]>(
    JSON.parse(localStorage.getItem("toDolist") || "{}")
  );
  // AddTodoItem
  const [inputValue, setInputValue] = useState<string>("");
  // TodoItem
  const [inputEditItem, setInputEditItem] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("toDolist", JSON.stringify(toDolist));
  }, [toDolist]);

  const theme = createTheme(Theme);

  // AddTodoItem
  const addItemToList = (event: React.MouseEvent<HTMLElement>) => {
    let newToDoList = [...toDolist];
    newToDoList.push({
      text: inputValue,
      checked: false,
      removing: false,
      editItem: false,
    });
    setTodolist(newToDoList);
    setInputValue("");
  };

  // TodoItem
  const handleRemoveItem = (itemIndex: number) => {
    const arrWithItemRemoving = toggleRemoveProperty(toDolist, itemIndex);
    setTodolist(arrWithItemRemoving);
  };

  // TodoItem
  const handleDelteItemFromState = (itemIndex: number) => {
    const arrWithoutItem = removeItem(toDolist, itemIndex);
    setTodolist(arrWithoutItem);
  };

  // TodoItem
  const handleToggleCheked = (itemIndex: number) => {
    const arrWithToggleChecked = toggleCheckedProperty(toDolist, itemIndex);
    setTodolist(arrWithToggleChecked);
  };
  // TodoItem
  const handleEditItem = (itemIndex: number) => {
    const arrWithToggledEditProp = toggleEditProperty(toDolist, itemIndex);
    setTodolist(arrWithToggledEditProp);
    setInputEditItem(toDolist[itemIndex].text);
  };
  // TodoItem
  const handlerSaveItem = (itemIndex: number) => {
    let newToDoList = [...toDolist];
    newToDoList[itemIndex].text = inputEditItem;
    newToDoList[itemIndex].editItem = !newToDoList[itemIndex].editItem;

    setTodolist(newToDoList);

    // setInputEditItem("");
  };

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
          <AddTodoItem
            inputValue={inputValue}
            setInputValue={setInputValue}
            addItemToList={addItemToList}
          ></AddTodoItem>

          {toDolist.map((item, index) => (
            <TodoItem
              inputEditItem={inputEditItem}
              setInputEditItem={setInputEditItem}
              handleRemoveItem={handleRemoveItem}
              handleDelteItemFromState={handleDelteItemFromState}
              handleToggleCheked={handleToggleCheked}
              handleEditItem={handleEditItem}
              handlerSaveItem={handlerSaveItem}
              item={item}
              index={index}
            ></TodoItem>
          ))}
        </StyledPaper>
      </Grid>
    </ThemeProvider>
  );
}
