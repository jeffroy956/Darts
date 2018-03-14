import PlayerStore from "./PlayerStore";

describe("PlayerStore", () => {
    it("adds a new Player", () => {
        const playerStore: PlayerStore = new PlayerStore();

        playerStore.addPlayer({
            name: "Jeff"
        });

        expect(playerStore.players.length).toBe(1);
    });
});
