import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import IconButton from "./IconButton";

describe("<HeaderContent/>", () => {
    it("renders with back link", () => {
        const headerTitle = shallow(<Header title="My Title" backLinkTo="/test" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).props().to).toBe("/test");
    });

    it("renders without a back link", () => {
        const headerTitle = shallow(<Header title="My Title" />);

        expect(headerTitle.find("h1").text()).toContain("My Title");
        expect(headerTitle.find(Link).length).toBe(0);
    });

    it("renders with an accept command", () => {
        const acceptCommand = jest.fn();

        const headerTitle = shallow(
            <Header title="My Title">
                <IconButton iconName="done" />
            </Header>
        );

        const acceptButton = headerTitle.find(IconButton);

        expect(acceptButton.props().iconName).toBe("done");
    });
});
