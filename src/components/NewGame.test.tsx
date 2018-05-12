import {shallow} from "enzyme";
import * as React from "react";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import NewGame from "./NewGame";

describe("<NewGame/>", () => {
    it("displays list of selected players", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const dartGameStore = new DartGameStore(playerStore);

        dartGameStore.selectPlayers([playerStore.players[3], playerStore.players[2]]);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("Lisa, Dawn");
    });

    it("displays no players selected message", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("No players selected.");
    });

    it("selects shanghai as a game", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);
        newGame.dive().find("select").simulate("change", {target: {value: "shanghai"}});

        expect(dartGameStore.selectedGame).toBe("shanghai");
    });

    it("disables start game button when no players selected", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const dartGameStore = new DartGameStore(playerStore);

        const newGame = shallow(<NewGame dartGameStore={dartGameStore}/>);

        const startButton = newGame.dive().find("button");

        expect(startButton.props().disabled).toBe(true);
    });
});
