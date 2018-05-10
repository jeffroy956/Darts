import {shallow} from "enzyme";
import * as React from "react";
import Player from "../models/Player";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import PlayerList, { PlayerListItem } from "./PlayerList";
import SelectPlayers from "./SelectPlayers";

describe("<SelectPlayers/>", () => {
    it("adds a player to game", () => {
        const playerStore = new PlayerStore([new Player("Jeff"), new Player("Joe"), 
            new Player("Dawn"), new Player("Lisa")]);
        
        const gameStore = new DartGameStore(playerStore);
        
        const selectPlayers = shallow(<SelectPlayers gameStore={gameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: true } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(gameStore.selectedPlayers.length).toBe(1);
        expect(gameStore.selectedPlayers[0].name).toBe("Jeff");
    });

    it("deselects player from game", () => {
        const playerStore = new PlayerStore([new Player("Jeff"), new Player("Joe"), 
        new Player("Dawn"), new Player("Lisa")]);
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectPlayers([playerStore.players[0], playerStore.players[1]]);

        const selectPlayers = shallow(<SelectPlayers gameStore={gameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: false } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(gameStore.selectedPlayers.length).toBe(1);
        expect(gameStore.selectedPlayers[0].name).toBe("Joe");
    });
});
