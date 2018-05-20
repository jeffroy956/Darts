import CricketScoring from "./CricketScoring";
import GameState from "./GameState";
import Player from "./Player";
import PlayerScore from "./PlayerScore";
import { ThrowModifier } from "./ThrowModifier";

describe("CricketScoring", () => {
    it("has a fieldSize of 7", () => {
        const aroundTheClockScoring = new CricketScoring();
        expect(aroundTheClockScoring.scoringFieldSize).toBe(7);
    });

    it("scores a double hit", () => {
        const player1 = new Player("One");
        const cricketScoring = new CricketScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, cricketScoring.scoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        cricketScoring.scoreThrow(gameState, 15, ThrowModifier.Double);
        expect(gameState.shooter.fieldScores[0]).toBe(2);
        expect(gameState.shooter.total).toBe(2);
    });

    it("indicates that game is complete after all fields have three hits", () => {
        const player1 = new Player("One");
        const cricketScoring = new CricketScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, cricketScoring.scoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        cricketScoring.scoreThrow(gameState, 15, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 15, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 15, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 16, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 16, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 16, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 17, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 17, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 17, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 18, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 18, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 18, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 19, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 19, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 19, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 20, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 20, ThrowModifier.Single);
        cricketScoring.scoreThrow(gameState, 20, ThrowModifier.Single);

        cricketScoring.scoreThrow(gameState, 25, ThrowModifier.Double);
        expect(gameState.gameCompleted).toBe(false);
        cricketScoring.scoreThrow(gameState, 25, ThrowModifier.Single);
        expect(gameState.gameCompleted).toBe(true);
    });

});
