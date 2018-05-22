import DartThrow from "./DartThrow";
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

        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));

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

        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));

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

        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));

        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));
        gameState.recordThrow(new DartThrow(1, 10, ThrowModifier.Double));

        expect(gameState.shooter).toBeDefined();
        expect(gameState.shooterName).toBe("One");
    });

    it("undo a throw in middle of player's turn", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 1),
            new PlayerScore(player2, 1)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        gameState.undoThrow();

        expect(gameState.shooter.total).toBe(1);
    });

    it("undo at start of next player's turn", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 1),
            new PlayerScore(player2, 1)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        gameState.undoThrow();

        expect(gameState.shooter.name).toBe("One");
        expect(gameState.shooter.total).toBe(2);
    });

    it("undo at start of a new round", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 1),
            new PlayerScore(player2, 1)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        gameState.undoThrow();

        expect(gameState.shooter.name).toBe("Two");
        expect(gameState.shooter.total).toBe(2);
        expect(gameState.playerScores[0].activeTurn.throws.length).toBe(3);
    });

    it("undo resets completed game state", () => {
        const player1 = new Player("One");
        const player2 = new Player("Two");

        const playerScores: PlayerScore[] = [
            new PlayerScore(player1, 1),
            new PlayerScore(player2, 1)
        ];

        const gameState = new GameState(playerScores);

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));

        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Single));
        gameState.recordThrow(new DartThrow(0, 1, ThrowModifier.Double));

        gameState.setWinner(playerScores[1]);

        gameState.undoThrow();

        expect(gameState.gameCompleted).toBe(false);
        expect(gameState.winner).toBeFalsy();
    });

});
