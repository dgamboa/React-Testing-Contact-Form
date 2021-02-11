import React from "react";
import { act, render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";
import userEvent from "@testing-library/user-event";

test("renders form without errors", () => {
  render(<ContactForm />);
});

test("form submits and adds an object to the page", async () => {
  // Arrange, Act, Assert
  render(<ContactForm />);

  const firstName = "Daniel";
  const lastName = "Gamboa";
  const email = "daniel@gamboa.com"
  const message = "Hello World"

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  
  userEvent.type(firstNameInput, firstName);
  userEvent.type(lastNameInput, lastName);
  userEvent.type(emailInput, email);
  userEvent.type(messageInput, message);

  expect(firstNameInput).toHaveValue(firstName);
  expect(lastNameInput).toHaveValue(lastName);
  expect(emailInput).toHaveValue(email);
  expect(messageInput).toHaveValue(message);
  
  const another = screen.queryByText(firstName)
  expect(another).toBeNull();  

  const button = screen.getByRole("button", { name: /submit/i });
  userEvent.click(button);

  // (1) Note the use of find by to give state time to update and re-render
  const firstNameText = screen.findByText(/daniel/i);
  console.log(firstNameText); // This will return a promise
  console.log(await firstNameText); // This will return the result once the promise is resolved
  expect(await firstNameText).toBeInTheDocument();

  // (2) This is a way to do it with .then()
  firstNameText
    .then(res => {
      console.log(res);
      expect(res).toBeInTheDocument();
    })
    .catch(err => console.log(err))

  console.log("End of Testing")
});