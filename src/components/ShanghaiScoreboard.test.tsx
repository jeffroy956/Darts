import {shallow} from "enzyme";
import * as React from "react";
import DartThrow from "../models/DartThrow";
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
        expect(header.at(2).text()).toBe("1");
        expect(header.at(3).text()).toBe("2");
        expect(header.at(8).text()).toBe("7");
        expect(header.at(9).text()).toBe("Total");
    });

    it("renders first player name with scores", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);
        gameState.shooter.tally(new DartThrow(0, 1, ThrowModifier.Triple));
        gameState.shooter.tally(new DartThrow(1, 1, ThrowModifier.Single));

        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);

        const playerScoreboard = scoreboard.find(ShanghaiPlayerScoreboard);
        const playerRow = playerScoreboard.dive().find("td");
        expect(playerRow.at(1).find("span").at(0).text()).toBe("One");
        expect(playerRow.at(2).text()).toBe("3");
        expect(playerRow.at(3).text()).toBe("1");
        expect(playerRow.at(9).text()).toBe("4");
    });

    it("indicates number of darts thrown by player", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7)
        ];

        const gameState = new GameState(playerScores);
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Triple));
        gameState.recordThrow(new DartThrow(1, 1, ThrowModifier.Single));

        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);

        const playerScoreboard = scoreboard.find(ShanghaiPlayerScoreboard);
        const playerRow = playerScoreboard.dive().find("td");

        expect(playerRow.at(1).find("span").at(1).text()).toBe("(2)");
    });

    it("indicates first player is active shooter", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7),
            new PlayerScore(new Player("Two"), 7)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);
        const playerScoreboard = scoreboard.find(ShanghaiPlayerScoreboard);

        const player1Row = playerScoreboard.at(0).dive().find("tr");
        const player2Row = playerScoreboard.at(1).dive().find("tr");
        expect(player1Row.hasClass("player--active")).toBe(true);
        expect(player2Row.hasClass("player--active")).toBe(false);
    });

    it("indicates second player is active shooter", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 7),
            new PlayerScore(new Player("Two"), 7)
        ];

        const gameState = new GameState(playerScores);
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Triple));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Triple));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        const scoreboard = shallow(<ShanghaiScoreboard gameState={gameState} />);
        const playerScoreboard = scoreboard.find(ShanghaiPlayerScoreboard);

        const player1Row = playerScoreboard.at(0).dive().find("tr");
        const player2Row = playerScoreboard.at(1).dive().find("tr");
        expect(player1Row.hasClass("player--active")).toBe(false);
        expect(player2Row.hasClass("player--active")).toBe(true);
    });

});
