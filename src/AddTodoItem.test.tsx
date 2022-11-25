import { render, screen } from "@testing-library/react";
import exp from "constants";
import { ChangeEvent, MouseEvent } from "react";
import { AddTodoItem } from "./AddTodoItem";

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
