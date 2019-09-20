import React from "react";
import { Table } from "./";
import ShallowRenderer from "react-test-renderer/shallow";

describe("Table", () => {
  it("renders correctly with no data", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Table />);
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with valid data", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <Table
        advisors={[
          {
            fname: "John",
            lname: "Doe",
            status: "online",
            language: "es",
            reviews: 100
          }
        ]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
