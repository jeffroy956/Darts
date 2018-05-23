import {shallow} from "enzyme";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import CricketScoreboard, { CricketPlayerScoreboard } from "./CricketScoreboard";

describe("<CricketScoreboard/>", () => {
    it("renders scoreboard headers", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 1)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<CricketScoreboard gameState={gameState} />);

        const headerRow = scoreboard.find("th");
        
        expect(headerRow.at(2).text()).toBe("15");
        expect(headerRow.at(8).text()).toBe("25");
    });

    it("renders all player names", () => {
        const playerScores: PlayerScore[] = [
            new PlayerScore(new Player("One"), 1),
            new PlayerScore(new Player("Two"), 1)
        ];

        const gameState = new GameState(playerScores);

        const scoreboard = shallow(<CricketScoreboard gameState={gameState} />);

        const playerScoreRows = scoreboard.find(CricketPlayerScoreboard);
        expect(playerScores.length).toBe(2);
    });

    it("renders player name and target score", () => {
        const playerScoreboard = shallow(
            <CricketPlayerScoreboard 
                playerName="One"
                shooterName="One"
                fieldScores={[1, 2, 0, 0, 0, 0, 3]}
                dartsThrown={1}
            />);
        
        const scoreRow = playerScoreboard.find("td");
        expect(scoreRow.at(1).text()).toBe("One (1)");
        expect(scoreRow.at(2).text()).toBe("/");
        expect(scoreRow.at(3).text()).toBe("X");
        expect(scoreRow.at(4).text()).toBe("");
        expect(scoreRow.at(8).text()).toBe("clearpanorama_fish_eye");
    });

});
