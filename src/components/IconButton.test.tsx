import { shallow } from "enzyme";
import * as React from "react";
import IconButton from "./IconButton";

describe("<HeaderCommand/>", () => {
    it("triggers ripple effect", () => {
        const iconButton = shallow(<IconButton iconName="Add" />);
        const rippleElement = iconButton.find(".icon-button__icon");
        rippleElement.simulate("click");

        expect(iconButton.find(".element--activated").length).toBe(1);
    });

    it("removes ripple effect after 1 second", () => {
        const iconButton = shallow(<IconButton iconName="Add" />);
        const rippleElement = iconButton.find(".icon-button__icon");
        
        const rippleWait = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });

        rippleElement.simulate("click");

        return rippleWait.then(() => {
            expect(iconButton.find(".element--activated").length).toBe(0);
        });
        
    });
});
