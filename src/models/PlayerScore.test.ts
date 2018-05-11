import Player from "./Player";
import PlayerScore from "./PlayerScore";
// tslint:disable-next-line:ordered-imports
import { DartThrow, ThrowModifier } from "./DartThrow";

describe("PlayerScore", () => {
    it("initializes with field size set", () => {
        const playerScore = new PlayerScore(new Player("One"), 7);

        expect(playerScore.player.name).toBe("One");
        expect(playerScore.fieldScores.length).toBe(7);
    });

    it("tallys a single hit player score", () => {
        const playerScore = new PlayerScore(new Player("One"), 7);
        const dartThrow: DartThrow = {
            scoreIndex: 0,
            basePointValue: 20,
            modifier: ThrowModifier.Single
        };

        playerScore.tally(dartThrow);

        expect(playerScore.fieldScores[0]).toBe(20);
    });

    it("tallys a double hit player score", () => {
        const playerScore = new PlayerScore(new Player("One"), 5);
        const dartThrow: DartThrow = {
            scoreIndex: 0,
            basePointValue: 20,
            modifier: ThrowModifier.Double
        };

        playerScore.tally(dartThrow);

        expect(playerScore.fieldScores[0]).toBe(40);
    });
    
    it("tallying a throw logs the dart throw", () => {
        const playerScore = new PlayerScore(new Player("One"), 5);

        playerScore.tally({
            scoreIndex: 0,
            basePointValue: 20,
            modifier: ThrowModifier.Double
        });
        playerScore.tally({
            scoreIndex: 1,
            basePointValue: 19,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        
        expect(playerScore.turns.length).toBe(1);
        expect(playerScore.turns[0].throws).toEqual([{
            scoreIndex: 0,
            basePointValue: 20,
            modifier: ThrowModifier.Double
        },
        {
            scoreIndex: 1,
            basePointValue: 19,
            modifier: ThrowModifier.Single
        },
        {
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        }]);
        expect(playerScore.turns[0].scoreTotal).toBe(40 + 19 + 18);
    });

    it("tallying 7th throw has appropriate turn tracking", () => {
        const playerScore = new PlayerScore(new Player("One"), 5);

        playerScore.tally({
            scoreIndex: 0,
            basePointValue: 20,
            modifier: ThrowModifier.Double
        });
        playerScore.tally({
            scoreIndex: 1,
            basePointValue: 19,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        playerScore.tally({
            scoreIndex: 2,
            basePointValue: 18,
            modifier: ThrowModifier.Single
        });
        
        expect(playerScore.turns.length).toBe(3);
        expect(playerScore.dartsThrown).toBe(7);
        expect(playerScore.total).toBe(40 + 19 + (18 * 5));
    });

});
