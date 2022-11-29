import { fireEvent, render, screen } from "@testing-library/react";
import CheckboxList from "./CheckboxList";

describe("CheckboxList", () => {
  test("Localstorage save data", () => {
    // Arranege
    // Act
    render(<CheckboxList />);

    const textField = screen.getByLabelText(/todo/i);
    fireEvent.change(textField, { target: { value: "liza" } });

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    const item = screen.getByText("liza");
    expect(item).toBeInTheDocument()
  });
});
