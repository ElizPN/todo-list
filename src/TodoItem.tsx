import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom/Zoom";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import { Item } from "./CkeckboxList";
import { styled } from "@mui/material/styles";
import { theme } from "./Theme";

const StyledTextField = styled(TextField)(() => ({
  width: "250px",
  paddingTop: "15px ",
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  overflow: "auto",
  paddingTop: "4px",
  paddingLeft: "10px",
}));

const StyledSaveIcon = styled(SaveIcon)(() => ({
  paddingTop: "25px",
  paddingLeft: "20px",
  color: theme.palette.secondary.main,
}));

const StyledCreateIcon = styled(CreateIcon)(() => ({
  paddingTop: "25px",
  color: theme.palette.primary.main,
}));

const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  paddingTop: "25px",
  color: theme.palette.primary.main,
}));

interface TodoItemProps {
  editingIndex: number | null;
  setEditingIndex: (index: number | null) => void;
  item: Item;
  index: number;
  inputEditItem: string;
  handleDelteItemFromState: (itemIndex: number) => void;
  handleToggleCheked: (itemIndex: number) => void;
  setInputEditItem: (text: string) => void;
  handlerSaveItem: (itemIndex: number) => void;
  handleRemoveItem: (itemIndex: number) => void;
}

export const TodoItem = ({
  editingIndex,
  setEditingIndex,
  item,
  index,
  inputEditItem,
  handleDelteItemFromState,
  handleToggleCheked,
  setInputEditItem,
  handlerSaveItem,
  handleRemoveItem,
}: TodoItemProps) => {
  const handlerEditingIndex = (currentIndex: number) => {
    setEditingIndex(currentIndex);
    setInputEditItem(item.text);
  };

  const handlerSaveItemText = () => {
    handlerSaveItem(index);
    setEditingIndex(null);
  };

  return (
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
          {editingIndex === index ? (
            <>
              <Grid item xs={9}>
                <StyledTextField
                  id='standard-basic'
                  label=''
                  variant='standard'
                  value={inputEditItem}
                  onChange={(event) => setInputEditItem(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <StyledSaveIcon onClick={handlerSaveItemText}></StyledSaveIcon>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={9}>
                <StyledListItemText
                  primary={item.text}
                  sx={{
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <StyledCreateIcon
                  onClick={(event: any) => handlerEditingIndex(index)}
                ></StyledCreateIcon>
              </Grid>
              <Grid item xs={1}>
                <StyledDeleteIcon
                  onClick={(event: any) => handleRemoveItem(index)}
                ></StyledDeleteIcon>
              </Grid>
            </>
          )}
        </ListItemButton>
      </Zoom>
    </Grid>
  );
};
