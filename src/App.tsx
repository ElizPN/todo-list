// import "./App.css";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import CheckboxList from "./CkeckboxList";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CheckboxList />
    </ThemeProvider>
  );
}

export default App;
