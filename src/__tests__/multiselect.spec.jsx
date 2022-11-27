import renderer from "react-test-renderer";
import React from "react";
import { shallow } from "enzyme";
import MultiSelect from "../components/MultiSelect";

describe("<MultiSelect />", () => {
  it("Should render correctly", () => {
    const component = renderer.create(<MultiSelect />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should have the correct label", () => {
    const component = shallow(<MultiSelect label="Select account type" />);
    expect(component.find("label").text()).toEqual("Select account type");
  });

  it("Should have one <select>", () => {
    const component = shallow(<MultiSelect />);
    expect(component.find("select").length).toBe(1);
  });
});
