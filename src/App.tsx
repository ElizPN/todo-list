// import "./App.css";
import { useState } from "react";

function App() {
  const [toDolist, setTodolist] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  function addItemToList(event: any) {
    const newToDoList = toDolist;
    newToDoList.push(inputValue);
    setTodolist([...newToDoList]);
    console.log(newToDoList);
  }

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={addItemToList}> submit</button>
      <ul>
        {toDolist.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
