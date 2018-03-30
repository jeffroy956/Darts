import { shallow } from "enzyme";
import * as React from "react";
import IconButton from "./IconButton";

describe("<HeaderCommand/>", () => {
    it("triggers ripple effect", () => {
        const iconButton = shallow(<IconButton iconName="Add" />);
        const rippleElement = iconButton.find(".icon-button__icon");
        const eventArgs = { pageX: 10, pageY: 10, currentTarget: { offsetLeft: 10, offsetTop: 10, clientWidth: 50 } };
        rippleElement.simulate("mouseDown", eventArgs);

        expect(iconButton.find(".element--activated").length).toBe(1);
    });

});
