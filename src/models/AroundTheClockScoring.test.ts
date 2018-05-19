import AroundTheClockScoring from "./AroundTheClockScoring";
import GameState from "./GameState";
import Player from "./Player";
import PlayerScore from "./PlayerScore";
import { ThrowModifier } from "./ThrowModifier";

describe("AroundTheClockScoring", () => {
    it("has a fieldSize of 1", () => {
        const aroundTheClockScoring = new AroundTheClockScoring();
        expect(aroundTheClockScoring.scoringFieldSize).toBe(1);
    });

    it("scores a double hit", () => {
        const player1 = new Player("One");
        const clockScoring = new AroundTheClockScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, clockScoring.scoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Double);

        expect(gameState.shooter.total).toBe(2);
    });

    it("indicates that game is complete after 20 is hit", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");
        const clockScoring = new AroundTheClockScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, clockScoring.scoringFieldSize),
            new PlayerScore(player2, clockScoring.scoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);

        for (let i = 1; i <= 19; i++) {
            clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
            clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
            clockScoring.scoreThrow(gameState, null, ThrowModifier.Single);

            clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
            clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
            clockScoring.scoreThrow(gameState, null, ThrowModifier.Single);
        }

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        clockScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        expect(gameState.gameCompleted).toBe(false);

        clockScoring.scoreThrow(gameState, null, ThrowModifier.Single);

        expect(gameState.gameCompleted).toBe(true);
        expect(gameState.winner.player).toBe(player2);
    });

});
