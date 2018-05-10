import Match from "./Match";
import Player from "./Player";

describe("Match", () => {
    it("starts a new match", () => {
        const players: Player[] = [
            {
                name: "Jeff"
            }
        ];

        const match = new Match(players);
        match.start();

        expect(match.currentPlayer).toEqual(players[0]);
    });
});
