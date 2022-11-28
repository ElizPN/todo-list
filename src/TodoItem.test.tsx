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
});
