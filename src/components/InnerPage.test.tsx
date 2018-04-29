import { shallow } from "enzyme";
import * as React from "react";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

describe("<InnerPage/>", () => {
    it("renders form with a header", () => {
        const form = shallow(
            <InnerPage pageHeader={<PageHeader title="test form" />} />
        );

        expect(form.find(PageHeader).props().title).toBe("test form");
    });

    it("renders form with body content", () => {
        const form = shallow(
            <InnerPage pageHeader={<PageHeader title="test form" />}>
                <main>this is my body content</main>
            </InnerPage>
        );

        expect(form.find("main").text()).toBe("this is my body content");
    });
});
