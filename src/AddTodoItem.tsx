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
    <TextField
      size='small'
      label='Let`s go!'
      color='primary'
      focused
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      sx={{
        width: "90%",
      }}
    />
    <Button
      variant='outlined'
      onClick={addItemToList}
      sx={{
        ml: 2,
        width: "10%",
      }}
    >
      Add
    </Button>
  </SyledFieldArea>
);
