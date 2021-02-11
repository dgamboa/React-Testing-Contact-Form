import React from "react";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("", () => {
  // Arrange, Act, Assert

  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  
})