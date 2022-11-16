import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const SyledFieldArea = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: "20px",
}));

export const SyledTextField = styled(TextField)(() => ({
  width: "90%",
}));

export const SyledAddButton = styled(Button)(() => ({
  marginLeft: "20px",
  width: "10%",
}));

interface AddTodoItemProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addItemToList: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AddTodoItem = ({
  inputValue,
  setInputValue,
  addItemToList,
}: AddTodoItemProps) => (
  <SyledFieldArea>
    <SyledTextField
      size='small'
      label='Let`s go!'
      color='primary'
      focused
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
    <SyledAddButton variant='outlined' onClick={addItemToList}>
      Add
    </SyledAddButton>
  </SyledFieldArea>
);
