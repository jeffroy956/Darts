import { shallow } from "enzyme";
import * as React from "react";
import { PlayerFakeStorage } from "../api/PlayerStorage";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import { ThrowModifier } from "../models/ThrowModifier";
import DartGameStore from "../stores/DartGameStore";
import PlayerStore from "../stores/PlayerStore";
import GameCompleted from "./GameCompleted";
import HitMissKeypad from "./HitMissKeypad";
import ShanghaiLayout from "./ShanghaiLayout";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

describe("<ShanghaiLayout/>", () => {
    it("has Shanghai style player scoreboard", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers([playerStore.players[0]]);
        gameStore.startGame();
        const layout = shallow(<ShanghaiLayout dartGameStore={gameStore} />);

        const scoreboard = layout.find(ShanghaiScoreboard);
        
        expect(scoreboard.props().gameState).toBe(gameStore.gameState);
    });

    it("has hit/miss style keypad", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers([playerStore.players[0]]);
        gameStore.startGame();
        const layout = shallow(<ShanghaiLayout dartGameStore={gameStore} />);

        const keypad = layout.find(HitMissKeypad);
        
        expect(keypad.length).toBe(1);
    });

    it("shows the winner player and hides the scorepad", () => {
        const playerStore = new PlayerStore(new PlayerFakeStorage());
        const gameStore = new DartGameStore(playerStore);
        gameStore.selectGame("shanghai");
        gameStore.selectPlayers(playerStore.players);
        gameStore.startGame();
        
        for (let i = 1; i <= 6; i++) {
            gameStore.scoreThrow(null, ThrowModifier.Miss);
            gameStore.scoreThrow(null, ThrowModifier.Miss);
            gameStore.scoreThrow(null, ThrowModifier.Miss);

            gameStore.scoreThrow(null, ThrowModifier.Miss);
            gameStore.scoreThrow(null, ThrowModifier.Miss);
            gameStore.scoreThrow(null, ThrowModifier.Miss);
        }
  
        gameStore.scoreThrow(null, ThrowModifier.Miss);
        gameStore.scoreThrow(null, ThrowModifier.Miss);
        gameStore.scoreThrow(null, ThrowModifier.Miss);

        gameStore.scoreThrow(null, ThrowModifier.Miss);
        gameStore.scoreThrow(null, ThrowModifier.Miss);
        gameStore.scoreThrow(null, ThrowModifier.Single);

        expect(gameStore.gameState.gameCompleted).toBe(true);

        const layout = shallow(<ShanghaiLayout dartGameStore={gameStore} />);

        const keypad = layout.find(HitMissKeypad);
        expect(keypad.length).toBe(0);

        expect(layout.find(GameCompleted).props().winnerName).toBe("Two");
        
    });

});
