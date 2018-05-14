import {shallow} from "enzyme";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import { ThrowModifier } from "../models/ThrowModifier";
import ShanghaiScoreboard, {ShanghaiPlayerScoreboard} from "./ShanghaiScoreboard";

describe("<ShanghaiScoreboard/>", () => {
    it("renders round header labels", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);

        const header = scoreboard.find("th");
        expect(header.at(1).text()).toBe("1");
        expect(header.at(2).text()).toBe("2");
        expect(header.at(7).text()).toBe("7");
        expect(header.at(8).text()).toBe("Total");
    });

    it("renders first player name with scores", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);
        gameState.shooter.tally({
            basePointValue: 1,
            modifier: ThrowModifier.Triple,
            scoreIndex: 0
        });
        gameState.shooter.tally({
            basePointValue: 1,
            modifier: ThrowModifier.Single,
            scoreIndex: 1
        });
        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);

        const playerScoreboard = scoreboard.find(ShanghaiPlayerScoreboard);
        const playerRow = playerScoreboard.dive().find("td");
        expect(playerRow.at(0).text()).toBe("One");
        expect(playerRow.at(1).text()).toBe("3");
        expect(playerRow.at(2).text()).toBe("1");
        expect(playerRow.at(8).text()).toBe("4");
    });

});
