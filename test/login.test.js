/**
 * @jest-environment jsdom
 */
/* global test, expect */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./login";
import React from "react";

test("formが存在することを確認(ユーザーネーム、パスワード、ログインボタン)", () => {
  render(<Login />);
  //formに emailとpasswordのinputがあるか確認
  const userInput = screen.getByTestId("Username"); //labelのfor属性とinputのid属性が一致しているか確認
  const passwordInput = screen.getByTestId("Password");
  const submitButton = screen.getByRole("button");
  expect(userInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(userInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });
  fireEvent.click(submitButton);
});
