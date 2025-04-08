/**
 * @format
 */

import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

test("renders correctly", () => {
  const { getByText } = render(<App />);
  
  // Check if some UI text exists (modify based on your app's content)
  expect(getByText("Login")).toBeTruthy();
});
