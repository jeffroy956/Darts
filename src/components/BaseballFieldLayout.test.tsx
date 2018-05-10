import { shallow } from "enzyme";
import * as React from "react";
import Player from "../models/Player";
import BaseballFieldLayout from "./BaseballFieldLayout";

describe("<BaseballFieldLayout/>", () => {
    xit("renders innings", () => {
        const players: Player[] = [
            {
                name: "Jeff"
            }
        ];

        const layout = shallow(<BaseballFieldLayout players={players} innings={9} />);
        const headerFields = layout.find("th");
        expect(headerFields.length).toBe(10);
        expect(headerFields.at(1).text()).toBe("1");
        expect(headerFields.at(9).text()).toBe(9);
    });
});
