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

const StyledTextField = styled(TextField)(() => ({
  width: "250px",
  paddingTop: "15px ",
}));

const StyledSaveIcon = styled(SaveIcon)(() => ({
  paddingTop: "25px",
  paddingLeft: "20px",
}));

const StyledListItemText = styled(ListItemText)(() => ({
  overflow: "auto",
  paddingTop: "4px",
  paddingLeft: "10px",
}));

const StyledCreateIcon = styled(CreateIcon)(() => ({
  paddingTop: "25px",
}));

const StyledDeleteIcon = styled(DeleteIcon)(() => ({
  paddingTop: "25px",
}));

interface TodoItemProps {
  item: Item;
  index: number;
  inputEditItem: string;
  handleDelteItemFromState: (itemIndex: number) => void;
  handleToggleCheked: (itemIndex: number) => void;
  setInputEditItem: (arg0: string) => void;
  handlerSaveItem: (itemIndex: number) => void;
  handleEditItem: (itemIndex: number) => void;
  handleRemoveItem: (itemIndex: number) => void;
}

export const TodoItem = ({
  item,
  index,
  inputEditItem,
  handleDelteItemFromState,
  handleToggleCheked,
  setInputEditItem,
  handlerSaveItem,
  handleEditItem,
  handleRemoveItem,
}: TodoItemProps) => (
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
              <StyledTextField
                id='standard-basic'
                label=''
                variant='standard'
                value={inputEditItem}
                onChange={(event) => setInputEditItem(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <StyledSaveIcon
                color='secondary'
                onClick={(event: any) => handlerSaveItem(index)}
              ></StyledSaveIcon>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={9}>
              <StyledListItemText primary={item.text} />
            </Grid>
            <Grid item xs={1}>
              <StyledCreateIcon
                color='primary'
                onClick={(event: any) => handleEditItem(index)}
              ></StyledCreateIcon>
            </Grid>
            <Grid item xs={1}>
              <StyledDeleteIcon
                color='primary'
                onClick={(event: any) => handleRemoveItem(index)}
              ></StyledDeleteIcon>
            </Grid>
          </>
        )}
      </ListItemButton>
    </Zoom>
  </Grid>
);
