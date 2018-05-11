import { DartThrow } from "./DartThrow";
import Player from "./Player";
import Turn from "./Turn";

export default class PlayerScore {
    public player: Player;
    public turns: Turn[] = [];
    public fieldScores: number[];
    public dartsThrown: number = 0;
    public turnNumber: number = 0;

    private activeTurn: Turn;
    private throwCount: number = 0;

    public constructor(player: Player, fieldSize: number) {
        this.player = player;
        this.fieldScores = Array(fieldSize).fill(0);
    }

    public get total(): number {
        return this.fieldScores.reduce((total, value) => total + value);
    }

    public tally(dartThrow: DartThrow) {
        this.fieldScores[dartThrow.scoreIndex] += dartThrow.basePointValue * dartThrow.modifier;
        this.dartsThrown++;
        if (this.throwCount === 0) {
            this.activeTurn = new Turn();
            this.turns.push(this.activeTurn);
        }
        this.activeTurn.log(dartThrow);
        this.throwCount++;
        if (this.throwCount === 3) {
            this.turnNumber++;
            this.throwCount = 0;
        }
    }

}
