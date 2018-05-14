import Player from "../models/Player";
import { ThrowModifier } from "../models/ThrowModifier";
import DartGameStore from "./DartGameStore";
import PlayerStore from "./PlayerStore";

describe("DartGameStore", () => {
    it("loads with list of players", () => {
        const players: Player[] = [new Player("Jane")];

        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);

        expect(gameStore.availablePlayers.length).toBe(1);
    });

    it("selects players for game", () => {
        const players: Player[] = [new Player("Jane"), new Player("Joe"), new Player("Mike"), new Player("Mary")];

        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);
        
        gameStore.selectPlayers([players[3], players[1]]);

        expect(gameStore.selectedPlayers[0].name).toBe("Mary");
        expect(gameStore.selectedPlayers[1].name).toBe("Joe");
    });

    it("selects type of darts game", () => {
        const players: Player[] = [new Player("Jane")];
        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);

        gameStore.selectGame("shanghai");

        expect(gameStore.selectedGame).toBe("shanghai");
    });

    it("allow new game enabled when players selected", () => {
        const players: Player[] = [new Player("Jane")];
        
        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);
       
        expect(gameStore.allowNewGame).toBe(false);
        gameStore.selectPlayers([players[0]]);
        expect(gameStore.allowNewGame).toBe(true);
    });

    it("initializes game state when dart game and players selected", () => {
        const players: Player[] = [new Player("One"), new Player("Two")];
        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);

        gameStore.selectPlayers(players);
        gameStore.selectGame("shanghai");
        gameStore.startGame();

        expect(gameStore.gameState).toBeTruthy();
        expect(gameStore.gameState.playerScores.length).toBe(2);
        expect(gameStore.gameState.shooterName).toBe("One");
    });

    it("initializes shanghai scoring game", () => {
        const players: Player[] = [new Player("One"), new Player("Two")];
        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);

        gameStore.selectPlayers(players);
        gameStore.selectGame("shanghai");
        gameStore.startGame();

        expect(gameStore.dartScoring).toBeTruthy();
        expect(gameStore.dartScoring.gameType).toBe("shanghai");
        expect(gameStore.gameState.shooter.fieldScores.length).toBe(7);
    });

    it("scores a dart throw", () => {
        const players: Player[] = [new Player("One"), new Player("Two")];
        const playerStore = new PlayerStore(players);
        const gameStore = new DartGameStore(playerStore);

        gameStore.selectPlayers(players);
        gameStore.selectGame("shanghai");
        gameStore.startGame();

        gameStore.scoreThrow(0, ThrowModifier.Triple);
        expect(gameStore.gameState.shooter.total).toBe(3);
        
    });

});
