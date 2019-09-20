import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { withFilter } from "./";

describe("withFilter", () => {
  let MyComponent, EnhancedComponent, wrapper, instance;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    MyComponent = () => <div> some component </div>;
    EnhancedComponent = withFilter(MyComponent);
    wrapper = shallow(<EnhancedComponent />);
    instance = wrapper.instance();
  });

  it("should render an enhanced component", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<EnhancedComponent />);
    expect(tree).toMatchSnapshot();
  });

  it("should initalize component state", () => {
    let actual = wrapper.state("filters");
    let expected = [];
    expect(actual).toEqual(expected);

    actual = wrapper.state("filters").length;
    expected = 0;
    expect(actual).toEqual(expected);
  });

  // component methods
  describe("applyFilter", () => {
    it("should set the value of filters", () => {
      let actual = wrapper.state("filters");
      let expected = [];
      expect(actual).toEqual(expected);

      const event = { target: { value: "someFilterValue" } };
      instance.applyFilter("number")(event);
      actual = wrapper.state("filters");
      expected = [{ id: "number", regex: /^.*someFilterValue.*$/ }];
      expect(actual).toEqual(expected);
    });
  });

  describe("filterRows", () => {
    it("should set the value of filters", () => {
      const row1 = { fname: "John", lname: "Doe" };
      const row2 = { fname: "Jane", lname: "Doe" };
      const rows = [row1, row2];
      wrapper.setState({
        filters: [{ id: "fname", regex: /^.*John.*$/ }]
      });

      let actual = instance.filterRows(rows);
      let expected = [row1];
      expect(actual).toEqual(expected);
    });
  });
});
