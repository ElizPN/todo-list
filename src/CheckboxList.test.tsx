import { fireEvent, render, screen } from "@testing-library/react";
import CheckboxList from "./CheckboxList";

describe("Integration: CheckboxList and internal components", () => {
  test("Adding new item to Todo list", () => {
    render(<CheckboxList />);

    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "liza" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const todoItem = screen.getByText("liza");
    expect(todoItem).toBeInTheDocument();
  });

  test("Deleting item from Todo list", () => {
    render(<CheckboxList />);

    const todoItem = screen.getByTestId("todo-item");

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
  });
});
