import {shallow} from "enzyme";
import { IObservableArray, observable } from "mobx";
import * as React from "react";
import { PlayerFakeStorage } from "../api/PlayerStorage";
import Player from "../models/Player";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import AroundTheClockLayout from "./AroundTheClockLayout";
import DartGame from "./DartGame";
import ShanghaiLayout from "./ShanghaiLayout";

describe("<DartGame />", () => {
    it("chooses a Shanghai layout for game", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage([
            new Player("One"),
            new Player("Two")
        ]));
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers(playerStore.players);
        gameStore.startGame();
        
        const dartGame = shallow(<DartGame dartGameStore={gameStore} />).dive();

        const layout = dartGame.find(ShanghaiLayout);
        expect(layout.length).toBe(1);
    });

    it("chooses a Around the clock layout for game", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage([
            new Player("One"),
            new Player("Two")
        ]));
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("aroundtheclock");
        gameStore.selectPlayers(playerStore.players);
        gameStore.startGame();
        
        const dartGame = shallow(<DartGame dartGameStore={gameStore} />).dive();

        const layout = dartGame.find(AroundTheClockLayout);
        expect(layout.length).toBe(1);
    });
});
