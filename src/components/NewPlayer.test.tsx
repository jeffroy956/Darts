import { shallow } from "enzyme";
import * as React from "react";
import NewPlayer from "./NewPlayer";

describe("<NewPlayer/>", () => {
    it("shows empty form", () => {
        const newPlayerForm = shallow(<NewPlayer/>);

        expect(newPlayerForm.find("input").length).toBe(1);
        expect(newPlayerForm.find("button").length).toBe(2);
    });
});
