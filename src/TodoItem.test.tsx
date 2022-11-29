import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  test("should call handleDelteItemFromState after click on DeleteIcon", () => {
    const setEditingIndex = jest.fn();
    const setInputEditItem = jest.fn();
    const handleDelteItemFromState = jest.fn();
    const handleToggleCheked = jest.fn();
    const handlerSaveItem = jest.fn();

    const item = {
      text: "some text",
      checked: false,
    };
    render(
      <TodoItem
        editingIndex={1}
        setEditingIndex={setEditingIndex}
        inputEditItem={"some text"}
        setInputEditItem={setInputEditItem}
        handleDelteItemFromState={handleDelteItemFromState}
        handleToggleCheked={handleToggleCheked}
        handlerSaveItem={handlerSaveItem}
        item={item}
        index={2}
        key={1}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(handleDelteItemFromState).toBeCalled();
  });

  test("should call handlerEditingIndex after click on EditeIcon", () => {
    const setEditingIndex = jest.fn();
    const setInputEditItem = jest.fn();
    const handleDelteItemFromState = jest.fn();
    const handleToggleCheked = jest.fn();
    const handlerSaveItem = jest.fn();

    const item = {
      text: "some text",
      checked: false,
    };
    render(
      <TodoItem
        editingIndex={1}
        setEditingIndex={setEditingIndex}
        inputEditItem={"some text"}
        setInputEditItem={setInputEditItem}
        handleDelteItemFromState={handleDelteItemFromState}
        handleToggleCheked={handleToggleCheked}
        handlerSaveItem={handlerSaveItem}
        item={item}
        index={2}
        key={1}
      />
    );

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
//  handlerEditingIndex calls two functions
    expect(setEditingIndex).toBeCalledWith(2);
    expect(setInputEditItem).toBeCalledWith("some text");
  });

   test("should call handlerSaveItem after click on SaveIcon", () => {
     const setEditingIndex = jest.fn();
     const setInputEditItem = jest.fn();
     const handleDelteItemFromState = jest.fn();
     const handleToggleCheked = jest.fn();
     const handlerSaveItem = jest.fn();

     const item = {
       text: "some text",
       checked: false,
     };
     render(
       <TodoItem
         editingIndex={1}
         setEditingIndex={setEditingIndex}
         inputEditItem={"some text"}
         setInputEditItem={setInputEditItem}
         handleDelteItemFromState={handleDelteItemFromState}
         handleToggleCheked={handleToggleCheked}
         handlerSaveItem={handlerSaveItem}
         item={item}
         index={1}
         key={1}
       />
     );

     const saveButton = screen.getByTestId("save-button");
     fireEvent.click(saveButton);
     expect(handlerSaveItem).toBeCalled()
     
   });

  
});
