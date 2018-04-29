import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";
import PageHeader from "./PageHeader";

describe("<PageHeader/>", () => {
    it("renders with back link", () => {
        const headerTitle = shallow(<PageHeader title="My Title" backLinkTo="/test" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).props().to).toBe("/test");
    });

    it("renders without a back link", () => {
        const headerTitle = shallow(<PageHeader title="My Title" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).length).toBe(0);
    });

    it("renders with an accept command", () => {
        const headerTitle = shallow(
            <PageHeader title="My Title" acceptElement={<IconButton iconName="done" />} />
        );

        const acceptButton = headerTitle.find(IconButton);

        expect(acceptButton.props().iconName).toBe("done");
    });
});
