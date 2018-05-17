import { PlayerFakeStorage } from "../api/PlayerStorage";
import PlayerStore from "./PlayerStore";

describe("PlayerStore", () => {
    it("creates a store with a default list of players", () => {
        const playerStore: PlayerStore = new PlayerStore(new PlayerFakeStorage([
            {
                name: "Joe"
            }
        ]));

        expect(playerStore.players.length).toBe(1);
        expect(playerStore.players[0].name).toBe("Joe");
    });

    it("adds a new Player", () => {
        const storage = new PlayerFakeStorage([]);
        const saveSpy = spyOn(storage, "save");
        const playerStore: PlayerStore = new PlayerStore(storage);

        playerStore.addPlayer({
            name: "Jeff"
        });

        expect(playerStore.players.length).toBe(1);
        expect(playerStore.players[0].name).toBe("Jeff");

        expect(saveSpy).toHaveBeenCalledWith(playerStore.players);
    });
});
