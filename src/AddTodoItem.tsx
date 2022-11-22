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

export const SyledTextField = styled(TextField)(({ theme }) => ({
  width: "90%",
  color: theme.palette.primary.main,
}));

export const SyledAddButton = styled(Button)(() => ({
  marginLeft: "20px",
  width: "10%",
}));

interface AddTodoItemProps {
  isDirty: boolean;
  handeOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputValue: string;
  addItemToList: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AddTodoItem = ({
  isDirty,
  handeOnChange,
  inputValue,
  addItemToList,
}: AddTodoItemProps) => (
  <SyledFieldArea>
    <SyledTextField
      error={inputValue === "" && isDirty}
      size='small'
      label='Let`s go!'
      focused
      value={inputValue}
      onChange={handeOnChange}
    />

    <SyledAddButton
      disabled={inputValue === ""}
      variant='outlined'
      onClick={addItemToList}
    >
      Add
    </SyledAddButton>
  </SyledFieldArea>
);
