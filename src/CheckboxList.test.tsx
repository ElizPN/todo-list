import { fireEvent, render, screen, within } from "@testing-library/react";
import CheckboxList from "./CheckboxList";

describe("Integration: CheckboxList and internal components", () => {
  beforeEach(() => {
      window.localStorage.clear();
  });
  test("Adding new item to Todo list", () => {
    render(<CheckboxList />);

    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "cook dinner" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const todoItem = screen.getByText("cook dinner");
    expect(todoItem).toBeInTheDocument();
  });

  test("Deleting item from Todo list", () => {
    render(<CheckboxList />);
    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "go to gym" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const todoItem = screen.getByTestId("todo-item");

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
  });

  test("TextField is cleared after click on AddButton", () => {
    render(<CheckboxList />);

    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "liza" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    expect(textField).toHaveValue("");
  });

  test("After click on EditButton TextField appears with same text that was in TodoItem", () => {
    render(<CheckboxList />);

    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "go to shopping" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    // Get todoItem by Text and test that it is in the Document
    expect(screen.getByText("go to shopping")).toBeInTheDocument();

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const itemTextField = screen.getByDisplayValue("go to shopping");
    expect(itemTextField).toBeInTheDocument();

    fireEvent.change(itemTextField, { target: { value: "go to massage" } });
    const editedTextField = screen.getByDisplayValue("go to massage");
    expect(editedTextField).toBeInTheDocument();

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(screen.getByText("go to massage")).toBeInTheDocument();
  });
});
