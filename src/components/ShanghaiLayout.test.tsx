import { shallow } from "enzyme";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import HitMissKeypad from "./HitMissKeypad";
import ShanghaiLayout from "./ShanghaiLayout";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

describe("<ShanghaiLayout/>", () => {
    it("has Shanghai style player scoreboard", () => {
        const playerStore = new PlayerStore([new Player("One")]);
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers([playerStore.players[0]]);
        const layout = shallow(<ShanghaiLayout dartGameStore={gameStore} />);

        const scoreboard = layout.find(ShanghaiScoreboard);
        
        expect(scoreboard.props().gameState).toBe(gameStore.gameState);
    });

    it("has hit/miss style keypad", () => {
        const playerStore = new PlayerStore([new Player("One")]);
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers([playerStore.players[0]]);
        const layout = shallow(<ShanghaiLayout dartGameStore={gameStore} />);

        const keypad = layout.find(HitMissKeypad);
        
        expect(keypad.length).toBe(1);
    });
});
