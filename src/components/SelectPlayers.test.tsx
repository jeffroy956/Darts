import {shallow} from "enzyme";
import * as React from "react";
import { PlayerFakeStorage } from "../api/PlayerStorage";
import Player from "../models/Player";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import PlayerList, { PlayerListItem } from "./PlayerList";
import SelectPlayers from "./SelectPlayers";

describe("<SelectPlayers/>", () => {
    it("adds a player to game", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage([new Player("Jeff"), new Player("Joe"), 
            new Player("Dawn"), new Player("Lisa")]));
        
        const dartGameStore = new DartGameStore(playerStore);
        
        const selectPlayers = shallow(<SelectPlayers dartGameStore={dartGameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: true } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(dartGameStore.selectedPlayers.length).toBe(1);
        expect(dartGameStore.selectedPlayers[0].name).toBe("Jeff");
    });

    it("deselects player from game", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage([new Player("Jeff"), new Player("Joe"), 
        new Player("Dawn"), new Player("Lisa")]));
        const dartGameStore = new DartGameStore(playerStore);
        dartGameStore.selectPlayers([playerStore.players[0], playerStore.players[1]]);

        const selectPlayers = shallow(<SelectPlayers dartGameStore={dartGameStore}/>).dive();

        const playerCheckbox = selectPlayers.find(PlayerList).dive().find(PlayerListItem).at(0).dive().find("input");
        playerCheckbox.simulate("change", { target: { checked: false } });

        selectPlayers.find("input[type='button']").simulate("click");

        expect(dartGameStore.selectedPlayers.length).toBe(1);
        expect(dartGameStore.selectedPlayers[0].name).toBe("Joe");
    });
});
