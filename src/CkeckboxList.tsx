import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { AddTodoItem } from "./AddTodoItem";
import { TodoItem } from "./TodoItem";

export interface Item {
  text: string;
  checked: boolean;
  removing: boolean;
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "700px",
  lineHeight: "60px",
  padding: "100px",
  backgroundColor: "#FBEBE7",
}));

const StyledGridContainer = styled(Grid)(() => ({
  minHeight: "100vh",
}));

export default function CheckboxList() {
  const [toDolist, setTodolist] = useState<Item[]>(
    JSON.parse(localStorage.getItem("toDolist") || "[]")
  );

  // AddTodoItem
  const [inputValue, setInputValue] = useState<string>("");
  // TodoItem
  const [inputEditItem, setInputEditItem] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("toDolist", JSON.stringify(toDolist));
  }, [toDolist]);

  // AddTodoItem
  const addItemToList = (event: React.MouseEvent<HTMLElement>) => {
    let newToDoList = [...toDolist];
    newToDoList.push({
      text: inputValue,
      checked: false,
      removing: false,
    });
    setTodolist(newToDoList);
    setInputValue("");
    setIsDirty(false);
  };

  const handeOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    setIsDirty(true);
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
  const handlerSaveItem = (itemIndex: number) => {
    let newToDoList = [...toDolist];
    newToDoList[itemIndex].text = inputEditItem;
    setTodolist(newToDoList);

    setInputEditItem("");
  };

  return (
    <StyledGridContainer
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <StyledPaper variant='outlined' square>
        <AddTodoItem
          isDirty={isDirty}
          handeOnChange={handeOnChange}
          inputValue={inputValue}
          addItemToList={addItemToList}
        ></AddTodoItem>

        {toDolist.map((item, index) => (
          <TodoItem
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            inputEditItem={inputEditItem}
            setInputEditItem={setInputEditItem}
            handleRemoveItem={handleRemoveItem}
            handleDelteItemFromState={handleDelteItemFromState}
            handleToggleCheked={handleToggleCheked}
            handlerSaveItem={handlerSaveItem}
            item={item}
            index={index}
            key={index}
          ></TodoItem>
        ))}
      </StyledPaper>
    </StyledGridContainer>
  );
}
