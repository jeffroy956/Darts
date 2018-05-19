import { shallow } from "enzyme";
import * as React from "react";
import IconButton from "./IconButton";

describe("<HeaderCommand/>", () => {
    it("executes command when clicked", () => {
        const clickCommand = jest.fn();

        const iconButton = shallow(<IconButton iconName="Add" onClick={clickCommand} />);

        iconButton.find(".icon-button__icon").simulate("click");

        expect(clickCommand).toHaveBeenCalled();
    });

});
