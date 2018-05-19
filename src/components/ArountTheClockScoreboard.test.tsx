import {shallow} from "enzyme";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import Turn from "../models/Turn";
import AroundTheClockScoreboard, {AroundTheClockPlayerScoreboard} from "./AroundTheClockScoreboard";

describe("<AroundTheClockScoreboard/>", () => {
    it("renders scoreboard headers", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 1)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<AroundTheClockScoreboard gameState={gameState} />);

        const headerRow = scoreboard.find("th");
        
        expect(headerRow.at(2).text()).toBe("Target");
        expect(headerRow.at(3).text()).toBe("Turn Score");
    });

    it("renders all player names", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 1),
            new PlayerScore(new Player("Two"), 1)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<AroundTheClockScoreboard gameState={gameState} />);

        const playerScoreRows = scoreboard.find(AroundTheClockPlayerScoreboard);
        expect(playerScores.length).toBe(2);
    });

    it("renders player name and target score", () => {
        const playerScoreboard = shallow(
            <AroundTheClockPlayerScoreboard 
                playerName="One"
                shooterName="One"
                fieldScores={[]}
                activeTurn={new Turn()}
                scoreTotal={1}
                dartsThrown={1}
            />);
        
        const scoreRow = playerScoreboard.find("td");
        expect(scoreRow.at(1).text()).toBe("One");
        expect(scoreRow.at(2).text()).toBe("2");
    });

    it("renders player name and target score", () => {
        const playerScoreboard = shallow(
            <AroundTheClockPlayerScoreboard 
                playerName="One"
                shooterName="One"
                fieldScores={[]}
                activeTurn={new Turn()}
                scoreTotal={1}
                dartsThrown={1}
            />);
        
        const scoreRow = playerScoreboard.find("td");
        expect(scoreRow.at(1).text()).toBe("One");
        expect(scoreRow.at(2).text()).toBe("2");
    });

});
