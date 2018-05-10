import Player from "./Player";

export enum ThrowModifier {
    Single = 1,
    Double = 2,
    Triple = 3
}
export interface DartThrow {
    scoreIndex: number;
    pointValue: number;
    modifier: ThrowModifier;
}

export class Turn {
    public throws: DartThrow[] = [];

    public get scoreTotal(): number {
        return this.throws
        .map((dartThrow) => dartThrow.pointValue * dartThrow.modifier)
        .reduce((total, value) => total + value);
    }
    
    public log(dartThrow: DartThrow) {
        this.throws.push(dartThrow);
    }
}

// tslint:disable-next-line:max-classes-per-file
export default class PlayerScore {
    public player: Player;
    public turns: Turn[] = [];
    public fieldScores: number[];

    private activeTurn: Turn;

    public constructor(player: Player, fieldSize: number) {
        this.player = player;
        this.fieldScores = Array(fieldSize).fill(0);
        this.activeTurn = new Turn();
        this.turns.push(this.activeTurn);
    }

    public tally(dartThrow: DartThrow) {
        this.fieldScores[dartThrow.scoreIndex] = dartThrow.pointValue * dartThrow.modifier;
        this.activeTurn.log(dartThrow);
    }

}
