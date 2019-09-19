import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { withSort } from "./";

describe("withSort", () => {
  let MyComponent, EnhancedComponent, wrapper, instance;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    MyComponent = () => <div> some component </div>;
    EnhancedComponent = withSort(MyComponent);
    wrapper = shallow(<EnhancedComponent />);
    instance = wrapper.instance();
  });

  it("should render an enhanced component", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<EnhancedComponent />);
    expect(tree).toMatchSnapshot();
  });

  it("should initalize component state", () => {
    const wrapper = shallow(<EnhancedComponent />);
    expect(wrapper.state("orderBy")).toBe("number");
    expect(wrapper.state("desc")).toBe(false);
  });

  // component methods
  describe("applySort", () => {
    it("should toggle the value of desc ", () => {
      expect(wrapper.state("orderBy")).toBe("number");
      expect(wrapper.state("desc")).toBe(false);
      instance.applySort("number")();
      expect(wrapper.state("desc")).toBe(true);
    });

    it("should set the value of orderBy ", () => {
      expect(wrapper.state("orderBy")).toBe("number");
      instance.applySort("fname")();
      expect(wrapper.state("orderBy")).toBe("fname");
    });
  });

  describe("extractValues", () => {
    it("should extract the expected values", () => {
      const actual = instance.extractValues({
        a: {
          number: 1,
          fname: "John",
          lname: "Doe",
          status: "online",
          language: "ru",
          reviews: 34
        },
        b: {
          number: 2,
          fname: "Jane",
          lname: "Doe",
          status: "online",
          language: "es",
          reviews: 99
        }
      });
      const expected = { a: 1, b: 2 };
      expect(actual).toEqual(expected);
    });
  });

  describe("isEmpty", () => {
    it("should return true, if input is empty", () => {
      expect(instance.isEmpty("some valid value")).toBe(false);
      expect(instance.isEmpty()).toBe(true);
      expect(instance.isEmpty(null)).toBe(true);
    });
  });

  describe("compareValues", () => {
    it("should return -1 if a < b", () => {
      let actual = instance.compareValues({ b: 2 });
      const expected = -1;
      expect(actual).toBe(expected);

      actual = instance.compareValues({ a: 1, b: 2 });
      expect(actual).toBe(expected);
    });

    it("should return 1 if a > b", () => {
      const actual = instance.compareValues({ a: 2, b: 1 });
      const expected = 1;
      expect(actual).toBe(expected);
    });

    it("should return 0 if a = b", () => {
      let actual = instance.compareValues({ a: 1, b: 1 });
      const expected = 0;
      expect(actual).toBe(expected);
    });
  });

  describe("reverseRows", () => {
    it("should reverse rows array", () => {
      let actual = instance.reverseRows([1, 2, 3]);
      let expected = [1, 2, 3];
      expect(actual).toEqual(expected);

      wrapper.setState({ desc: true });
      actual = instance.reverseRows([1, 2, 3]);
      expected = [3, 2, 1];
      expect(actual).toEqual(expected);
    });
  });

  describe("sortRows", () => {
    it("should sort rows array", () => {
      let actual = instance.sortRows([
        { number: 1 },
        { number: 3 },
        { number: 2 }
      ]);
      let expected = [{ number: 1 }, { number: 2 }, { number: 3 }];
      expect(actual).toEqual(expected);

      actual = instance.sortRows([
        { number: 1 },
        { number: null },
        { number: 2 }
      ]);
      expected = [{ number: null }, { number: 1 }, { number: 2 }];
      expect(actual).toEqual(expected);
    });
  });

  describe("sortMethod", () => {
    it("should return -1 if a < b", () => {
      const actual = instance.sortMethod({ number: 1 }, { number: 2 });
      const expected = -1;
      expect(actual).toBe(expected);
    });

    it("should return 1 if a > b", () => {
      const actual = instance.sortMethod({ number: 2 }, { number: 1 });
      const expected = 1;
      expect(actual).toBe(expected);
    });

    it("should return 0 if a = b", () => {
      const actual = instance.sortMethod({ number: 1 }, { number: 1 });
      const expected = 0;
      expect(actual).toBe(expected);
    });
  });
});
