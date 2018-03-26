import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import { HeaderTitle } from "./HeaderTitle";

describe("<HeaderTitle/>", () => {
    it("renders with back link", () => {
        const headerTitle = shallow(<HeaderTitle title="My Title" backLinkTo="/test" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).props().to).toBe("/test");
    });

    it("renders without a back link", () => {
        const headerTitle = shallow(<HeaderTitle title="My Title" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).length).toBe(0);
    });
});
