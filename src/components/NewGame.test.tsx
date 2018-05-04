import {shallow} from "enzyme";
import * as React from "react";
import GameStore from "../stores/GameStore";
import PlayerStore from "../stores/PlayerStore";
import NewGame from "./NewGame";

describe("<NewGame/>", () => {
    it("displays list of selected players", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const gameStore = new GameStore(playerStore);

        gameStore.selectPlayer("Lisa");
        gameStore.selectPlayer("Dawn");

        const newGame = shallow(<NewGame gameStore={gameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("Lisa, Dawn");
    });

    it("displays no players selected message", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const gameStore = new GameStore(playerStore);

        const newGame = shallow(<NewGame gameStore={gameStore}/>);
        expect(newGame.dive().find(".new-game__players").find("span").text()).toBe("No players selected.");
    });

    it("selects cricket as a game", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const gameStore = new GameStore(playerStore);

        const newGame = shallow(<NewGame gameStore={gameStore}/>);
        newGame.dive().find("select").simulate("change", {target: {value: "Cricket"}});

        expect(gameStore.selectedGame).toBe("Cricket");
    });
});
