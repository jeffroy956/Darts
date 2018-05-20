import { computed, observable } from "mobx";
import DartThrow from "./DartThrow";
import Player from "./Player";
import Turn from "./Turn";

export default class PlayerScore {
    public player: Player;
    public turns: Turn[] = [];
    @observable public fieldScores: number[];
    @observable public dartsThrown: number = 0;
    public turnNumber: number = 0;

    @observable public activeTurn: Turn;

    public constructor(player: Player, fieldSize: number) {
        this.player = player;
        this.fieldScores = Array(fieldSize).fill(0);
        this.activeTurn = new Turn();
        this.turns.push(this.activeTurn);
    }

    @computed
    public get total(): number {
        return this.fieldScores.reduce((total, value) => total + value);
    }

    public get name(): string {
        return this.player.name;
    }

    public nextTurn() {
        this.activeTurn = new Turn();
        this.turns.push(this.activeTurn);
        this.turnNumber++;
    }

    public tally(dartThrow: DartThrow) {
        this.fieldScores[dartThrow.scoreIndex] += dartThrow.totalPointValue;
        this.dartsThrown++;
        this.activeTurn.log(dartThrow);
    }

}
