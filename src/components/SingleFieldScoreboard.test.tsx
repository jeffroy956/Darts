import {shallow} from "enzyme";
import * as React from "react";
import DartThrow from "../models/DartThrow";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import { ThrowModifier } from "../models/ThrowModifier";
import Turn from "../models/Turn";
import SingleFieldScoreboard, {SingleFieldPlayerScoreboard} from "./SingleFieldScoreboard";

describe("<SingleFieldScoreboard/>", () => {
    it("renders scoreboard headers", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 1)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<SingleFieldScoreboard gameState={gameState} />);

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

        const scoreboard = shallow(<SingleFieldScoreboard gameState={gameState} />);

        const playerScoreRows = scoreboard.find(SingleFieldPlayerScoreboard);
        expect(playerScores.length).toBe(2);
    });

    it("renders player name and target score", () => {
        const playerScoreboard = shallow(
            <SingleFieldPlayerScoreboard 
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
            <SingleFieldPlayerScoreboard 
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

    it("renders scores for a new turn", () => {
        const playerScoreboard = shallow(
            <SingleFieldPlayerScoreboard 
                playerName="One"
                shooterName="One"
                fieldScores={[]}
                activeTurn={new Turn()}
                scoreTotal={1}
                dartsThrown={1}
            />);
        
        const scoreRow = playerScoreboard.find("td");
        
        expect(scoreRow.at(3).text()).toBe("");
        expect(scoreRow.at(4).text()).toBe("");
        expect(scoreRow.at(5).text()).toBe("");
    });

    it("renders scores for a complete turn", () => {
        const turn = new Turn();
        turn.log(new DartThrow(0, 1, ThrowModifier.Single));
        turn.log(new DartThrow(0, 1, ThrowModifier.Double));
        turn.log(new DartThrow(0, 1, ThrowModifier.Triple));

        const playerScoreboard = shallow(
            <SingleFieldPlayerScoreboard 
                playerName="One"
                shooterName="One"
                fieldScores={[]}
                activeTurn={turn}
                scoreTotal={1}
                dartsThrown={1}
            />);
        
        const scoreRow = playerScoreboard.find("td");
        
        expect(scoreRow.at(3).text()).toBe("1");
        expect(scoreRow.at(4).text()).toBe("2");
        expect(scoreRow.at(5).text()).toBe("3");
    });
});
