import {shallow} from "enzyme";
import { IObservableArray, observable } from "mobx";
import * as React from "react";
import Player from "../models/Player";

describe("<Scoreboard />", () => {
    it("starts a baseball dart game for 2 players", () => {
        const players: IObservableArray<Player> = observable.array([
            new Player("Jeff")
        ]);

        // const scoreboard = shallow(<Scoreboard players=[] game="Baseball" />)
    });
});
