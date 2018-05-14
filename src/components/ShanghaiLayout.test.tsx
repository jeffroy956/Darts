import { shallow } from "enzyme";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import HitMissKeypad from "./HitMissKeypad";
import ShanghaiLayout from "./ShanghaiLayout";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

describe("<ShanghaiLayout/>", () => {
    it("has Shanghai style player scoreboard", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);

        const layout = shallow(<ShanghaiLayout gameState={gameState} />);

        const scoreboard = layout.find(ShanghaiScoreboard);
        
        expect(scoreboard.props().gameState).toBe(gameState);
    });

    it("has hit/miss style keypad", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);

        const layout = shallow(<ShanghaiLayout gameState={gameState} />);

        const keypad = layout.find(HitMissKeypad);
        
        expect(keypad.length).toBe(1);
    });
});
