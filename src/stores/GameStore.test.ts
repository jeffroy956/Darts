import Player from "../models/Player";
import GameStore from "./GameStore";
import PlayerStore from "./PlayerStore";

describe("GameStore", () => {
    it("loads with list of players", () => {
        const players: Player[] = 
        [ 
            {
                name: "Jane"
            }
        ];

        const playerStore = new PlayerStore(players);
        const gameStore = new GameStore(playerStore);

        expect(gameStore.availablePlayers.length).toBe(1);
    });

    it("selects players for game", () => {
        const players: Player[] = 
        [ 
            {
                name: "Jane"
            },
            {
                name: "Joe"
            },
            {
                name: "Mike"
            },
            {
                name: "Mary"
            }
        ];

        const playerStore = new PlayerStore(players);
        const gameStore = new GameStore(playerStore);
        
        gameStore.selectPlayer("Mary");
        gameStore.selectPlayer("Joe");

        expect(gameStore.selectedPlayers).toEqual([
            {
                name: "Mary"
            },
            {
                name: "Joe"
            }
        ]);
    });

    it("deselects players", () => {
        const players: Player[] = 
        [ 
            {
                name: "Jane"
            },
            {
                name: "Joe"
            },
            {
                name: "Mike"
            },
            {
                name: "Mary"
            }
        ];

        const playerStore = new PlayerStore(players);
        const gameStore = new GameStore(playerStore);
        
        gameStore.selectPlayer("Mary");
        gameStore.selectPlayer("Joe");
        gameStore.deselectPlayer("Mary");

        expect(gameStore.selectedPlayers).toEqual([
            {
                name: "Joe"
            }
        ]);
    });

    it("selects type of darts game", () => {
        const players: Player[] = 
        [ 
            {
                name: "Jane"
            }
        ];

        const playerStore = new PlayerStore(players);
        const gameStore = new GameStore(playerStore);

        gameStore.selectGame("Cricket");

        expect(gameStore.selectedGame).toBe("Cricket");

    });
});
