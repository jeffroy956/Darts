import PlayerStore from "./PlayerStore";

describe("PlayerStore", () => {
    it("creates a store with a default list of players", () => {
        const playerStore: PlayerStore = new PlayerStore([
            {
                name: "Joe"
            }
        ]);

        expect(playerStore.players.length).toBe(1);
        expect(playerStore.players[0].name).toBe("Joe");
    });

    it("adds a new Player", () => {
        const playerStore: PlayerStore = new PlayerStore([]);

        playerStore.addPlayer({
            name: "Jeff"
        });

        expect(playerStore.players.length).toBe(1);
        expect(playerStore.players[0].name).toBe("Jeff");
    });
});
