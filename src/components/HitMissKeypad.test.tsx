import { shallow } from "enzyme";
import * as React from "react";
import { ThrowModifier } from "../models/ThrowModifier";
import HitMissKeypad from "./HitMissKeypad";

describe("<HitMissKeypad />", () => {
    it("records a hit", () => {
        const scoreSpy = jest.fn();
        const hitMissKeyPad = shallow(<HitMissKeypad undo={jest.fn()} scoreThrow={scoreSpy} />);

        hitMissKeyPad.find("button").at(1).simulate("click");

        expect(scoreSpy).toHaveBeenCalledWith(ThrowModifier.Single);
    });

    it("records an undo", () => {
        const undoSpy = jest.fn();
        const hitMissKeyPad = shallow(<HitMissKeypad undo={undoSpy} scoreThrow={jest.fn()} />);

        hitMissKeyPad.find("button").last().simulate("click");

        expect(undoSpy).toHaveBeenCalled();
    });
});
