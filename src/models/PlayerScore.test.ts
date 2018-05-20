import DartThrow from "./DartThrow";
import Player from "./Player";
import PlayerScore from "./PlayerScore";
import { ThrowModifier } from "./ThrowModifier";

describe("PlayerScore", () => {
    it("initializes with field size set", () => {
        const playerScore = new PlayerScore(new Player("One"), 7);

        expect(playerScore.player.name).toBe("One");
        expect(playerScore.fieldScores.length).toBe(7);
    });

    it("tallys a single hit player score", () => {
        const playerScore = new PlayerScore(new Player("One"), 7);
        const dartThrow = new DartThrow(0, 20, ThrowModifier.Single);

        playerScore.tally(dartThrow);

        expect(playerScore.fieldScores[0]).toBe(20);
    });

    it("tallys a double hit player score", () => {
        const playerScore = new PlayerScore(new Player("One"), 5);
        const dartThrow = new DartThrow(0, 20, ThrowModifier.Double);

        playerScore.tally(dartThrow);

        expect(playerScore.fieldScores[0]).toBe(40);
    });
    
    it("tallying a throw logs the dart throw", () => {
        const playerScore = new PlayerScore(new Player("One"), 5);

        playerScore.tally(new DartThrow(0, 20, ThrowModifier.Double));
        playerScore.tally(new DartThrow(1, 19, ThrowModifier.Single));
        playerScore.tally(new DartThrow(2, 18, ThrowModifier.Single));
        
        expect(playerScore.turns.length).toBe(1);
        expect(playerScore.turns[0].throws).toEqual([
            new DartThrow(0, 20, ThrowModifier.Double),
            new DartThrow(1, 19, ThrowModifier.Single),
            new DartThrow(2, 18, ThrowModifier.Single)]);

        expect(playerScore.turns[0].scoreTotal).toBe(40 + 19 + 18);
    });

});
