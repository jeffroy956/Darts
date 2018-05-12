import { shallow } from "enzyme";
import * as React from "react";
import Player from "../models/Player";
import ShanghaiLayout from "./ShanghaiLayout";

describe("<ShanghaiLayout/>", () => {
    xit("has Shanghai style scoreboard and input", () => {
        const players: Player[] = [
            {
                name: "Jeff"
            }
        ];

        const layout = shallow(<ShanghaiLayout players={players} rounds={9} />);
        const headerFields = layout.find("th");
        expect(headerFields.length).toBe(10);
        expect(headerFields.at(1).text()).toBe("1");
        expect(headerFields.at(9).text()).toBe(9);
    });
});
