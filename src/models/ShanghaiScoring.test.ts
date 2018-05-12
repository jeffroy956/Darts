import { ThrowModifier } from "./DartThrow";
import GameState from "./GameState";
import Player from "./Player";
import PlayerScore from "./PlayerScore";
import ShanghaiScoring from "./ShanghaiScoring";

describe("ShanghaiScoring", () => {
    it("score single hit for first dart thrown", () => {
        const player1 = new Player("Jeff");
        const shanghaiScoring = new ShanghaiScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, shanghaiScoring.ScoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Single);

        expect(gameState.shooter.total).toBe(1);
    });

    it("second round scores a hit in second field", () => {
        const player1 = new Player("Jeff");
        const shanghaiScoring = new ShanghaiScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, shanghaiScoring.ScoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Single);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Triple);

        expect(gameState.shooter.total).toBe(4);
        expect(gameState.shooter.fieldScores[1]).toBe(3);
    });

    it("scores a double hit for second shooter", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");
        const shanghaiScoring = new ShanghaiScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, shanghaiScoring.ScoringFieldSize),
            new PlayerScore(player2, shanghaiScoring.ScoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Miss);
        shanghaiScoring.scoreThrow(gameState, null, ThrowModifier.Double);

        expect(playerScores[1].fieldScores[0]).toBe(2);
    });

});
