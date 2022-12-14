import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StyledFieldArea = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: "20px",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90%",
  color: theme.palette.primary.main,
}));

export const StyledAddButton = styled(Button)(() => ({
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
  <StyledFieldArea>
    <StyledTextField
      data-testid='add-item-textfield'
      error={inputValue === "" && isDirty}
      size='small'
      label='Todo!'
      focused
      value={inputValue}
      onChange={handeOnChange}
    />

    <StyledAddButton
      data-testid='add-button'
      disabled={inputValue === ""}
      variant='outlined'
      onClick={addItemToList}
    >
      Add
    </StyledAddButton>
  </StyledFieldArea>
);
