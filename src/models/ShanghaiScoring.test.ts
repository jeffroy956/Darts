import GameState from "./GameState";
import Player from "./Player";
import PlayerScore, { ThrowModifier } from "./PlayerScore";
import ShanghaiScoring from "./ShanghaiScoring";

describe("BaseballScoring", () => {
    xit("score single hit for first dart thrown", () => {
        const player1 = new Player("Jeff");
        const shanghaiScoring = new ShanghaiScoring();

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, shanghaiScoring.ScoringFieldSize)
        ];

        const gameState = new GameState(playerScores);

        const adjustedGameState = shanghaiScoring.scoreThrow(gameState, 1, ThrowModifier.Single);

        expect(adjustedGameState.playerScores[0].fieldScores[0]).toBe(1);
    });
});
