// import "./App.css";
import { ThemeProvider } from "@mui/system";
import CheckboxList from "./CkeckboxList";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Todolister</h1>
      <CheckboxList />
    </ThemeProvider>
  );
}

export default App;
