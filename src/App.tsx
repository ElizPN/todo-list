// import "./App.css";

import { ThemeProvider } from "@mui/system";
import CheckboxList from "./CheckboxList";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CheckboxList />
    </ThemeProvider>
  );
}

export default App;
