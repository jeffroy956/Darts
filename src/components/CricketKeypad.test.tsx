import {shallow} from "enzyme";
import * as React from "react";
import { ThrowModifier } from "../models/ThrowModifier";
import CricketKeypad, { PointKey } from "./CricketKeypad";

describe("<CricketKeypad/>", () => {
    it("scores a single 16 hit", () => {
        const keySpy = jest.fn();
        const keypad = shallow(<CricketKeypad scoreThrow={keySpy} undo={null} />);

        keypad.find(PointKey).at(1).dive().simulate("click");

        // scoreThrow: (boardNumber: number, modifier: ThrowModifier) => void;
        expect(keySpy).toHaveBeenCalledWith(16, ThrowModifier.Single);
    });

    it("scores a double 16 hit", () => {
        const keySpy = jest.fn();
        const keypad = shallow(<CricketKeypad scoreThrow={keySpy} undo={null} />);

        keypad.find(".button--modifier").at(0).simulate("click");
        keypad.find(PointKey).at(1).dive().simulate("click");

        expect(keySpy).toHaveBeenCalledWith(16, ThrowModifier.Double);
    });

    it("scores a triple 16 hit", () => {
        const keySpy = jest.fn();
        const keypad = shallow(<CricketKeypad scoreThrow={keySpy} undo={null} />);

        keypad.find(".button--modifier").at(1).simulate("click");
        keypad.find(PointKey).at(1).dive().simulate("click");

        expect(keySpy).toHaveBeenCalledWith(16, ThrowModifier.Triple);
    });

    it("resets throw modifer on second click", () => {
        const keySpy = jest.fn();
        const keypad = shallow(<CricketKeypad scoreThrow={keySpy} undo={null} />);

        keypad.find(".button--modifier").at(1).simulate("click");
        keypad.find(".button--modifier").at(1).simulate("click");
        keypad.find(PointKey).at(1).dive().simulate("click");

        expect(keySpy).toHaveBeenCalledWith(16, ThrowModifier.Single);
    });
});
