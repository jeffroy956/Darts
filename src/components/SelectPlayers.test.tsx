import {shallow} from "enzyme";
import * as React from "react";
import GameStore from "../stores/GameStore";
import PlayerStore from "../stores/PlayerStore";
import PlayerList, { PlayerListItem } from "./PlayerList";
import SelectPlayers from "./SelectPlayers";

describe("<SelectPlayers/>", () => {
    it("adds a player to game", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const gameStore = new GameStore(playerStore);
        
        const selectPlayers = shallow(<SelectPlayers gameStore={gameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: true } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(gameStore.selectedPlayers.length).toBe(1);
        expect(gameStore.selectedPlayers[0].name).toBe("Jeff");
    });

    it("deselects player from game", () => {
        const playerStore = new PlayerStore([{name: "Jeff"}, {name: "Joe"}, {name: "Dawn"}, {name: "Lisa"}]);
        const gameStore = new GameStore(playerStore);
        gameStore.selectPlayers([playerStore.players[0], playerStore.players[1]);

        const selectPlayers = shallow(<SelectPlayers gameStore={gameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: false } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(gameStore.selectedPlayers.length).toBe(1);
        expect(gameStore.selectedPlayers[0].name).toBe("Joe");
    });
});
