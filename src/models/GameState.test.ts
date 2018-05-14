import GameState from "./GameState";
import Player from "./Player";
import PlayerScore from "./PlayerScore";
import { ThrowModifier } from "./ThrowModifier";

describe("GameState", () => {
    it("Records throw", () => {
        const player1 = new Player("One");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 7)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });

        expect(gameState.shooter.dartsThrown).toBe(1);
        expect(gameState.shooter.total).toBe(20);
    });

    it("Switches active shooter after 3 throws", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 7),
            new PlayerScore(player2, 7)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });

        expect(gameState.shooter.player.name).toBe("Two");
    });

    it("Returns to first shooter after 6 throws", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 7),
            new PlayerScore(player2, 7)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });
        gameState.recordThrow({
            scoreIndex: 1,
            basePointValue: 10,
            modifier: ThrowModifier.Double
        });

        expect(gameState.shooter).toBeDefined();
        expect(gameState.shooterName).toBe("One");
    });
});
