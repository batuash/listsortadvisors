import React from "react";
import { App } from "./";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders correctly", () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<App />);
  expect(tree).toMatchSnapshot();
});
