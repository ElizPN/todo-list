import { fireEvent, render, screen } from "@testing-library/react";
import exp from "constants";
import { ChangeEvent, MouseEvent } from "react";
import { AddTodoItem } from "./AddTodoItem";

describe("AddTodoItem", () => {
  test("render Let`s go text in input", () => {
    const handeOnChange = jest.fn();
    const addItemToList = jest.fn();
    render(
      <AddTodoItem
        isDirty={false}
        handeOnChange={handeOnChange}
        inputValue={""}
        addItemToList={addItemToList}
      />
    );

    const textElement = screen.getByTestId("add-item-textfield");
    expect(textElement).toBeInTheDocument();
  });

  test("existing Add button ", () => {
    const handeOnChange = jest.fn();
    const addItemToList = jest.fn();
    render(
      <AddTodoItem
        isDirty={false}
        handeOnChange={handeOnChange}
        inputValue={""}
        addItemToList={addItemToList}
      />
    );

    const buttonElement = screen.getByTestId("add-button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("should call addItemTolist when inputValue has text ", () => {
    // Arrange
    const handeOnChange = jest.fn();
    const addItemToList = jest.fn();
    render(
      <AddTodoItem
        isDirty={false}
        handeOnChange={handeOnChange}
        inputValue={"some text"}
        addItemToList={addItemToList}
      />
    );
    const addButton = screen.getByTestId("add-button");
    //Act
    // simulate click on Addbutton
    fireEvent.click(addButton);

    //Assert
    // addItemTolist shoud be called
    expect(addItemToList).toHaveBeenCalled();
  });

  test("AddButton should be disabled when inputValue is empty ", () => {
    // Arrange
    const handeOnChange = jest.fn();
    const addItemToList = jest.fn();
    //Act
    render(
      <AddTodoItem
        isDirty={false}
        handeOnChange={handeOnChange}
        inputValue={""}
        addItemToList={addItemToList}
      />
    );
    const addButton = screen.getByTestId("add-button");

    //Assert
    expect(addButton).toBeDisabled();
  });

  test("AddButton should be anabled when inputValue is not empty ", () => {
    // Arrange
    const handeOnChange = jest.fn();
    const addItemToList = jest.fn();
    //Act
    render(
      <AddTodoItem
        isDirty={false}
        handeOnChange={handeOnChange}
        inputValue={"some text"}
        addItemToList={addItemToList}
      />
    );
    const addButton = screen.getByTestId("add-button");

    //Assert
    expect(addButton.getAttribute("disabled")).toBeNull();
  });
});
