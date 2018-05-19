import {shallow} from "enzyme";
import * as React from "react";
import { PlayerFakeStorage } from "../api/PlayerStorage";
import Player from "../models/Player";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import NewGame from "./NewGame";
import TextButton from "./TextButton";

describe("<NewGame/>", () => {
    it("displays list of selected players", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage(
            [new Player("Jeff"), new Player("Joe"), new Player("Dawn"), new Player("Lisa")]));
        const dartGameStore = new DartGameStore(playerStore);

        dartGameStore.selectPlayers([playerStore.players[3], playerStore.players[2]]);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("Lisa, Dawn");
    });

    it("displays no players selected message", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("No players selected.");
    });

    it("selects shanghai as a game", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        newGame.dive().find("select").simulate("change", {target: {value: "shanghai"}});

        expect(dartGameStore.selectedGame).toBe("shanghai");
    });

    it("disables start game button when no players selected", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);

        const startButton = newGame.dive().find(TextButton);

        expect(startButton.props().disabled).toBe(true);
    });
});
