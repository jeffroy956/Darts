import { observable } from "mobx";
import Player from "./Player";
import PlayerScore, { DartThrow } from "./PlayerScore";

export default class Match {
    public players: Player[];
    public playerScores: PlayerScore[];
    @observable public currentPlayer: Player;

    constructor(players: Player[]) {
        this.players = players;
    }

    public start() {
        this.currentPlayer = this.players[0];
    }

    public score(dartThrow: DartThrow) {
        //
    }

    public undo() {
        //        
    }
}
