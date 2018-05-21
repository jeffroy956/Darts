import { observable } from "mobx";
import DartThrow from "./DartThrow";
import Player from "./Player";
import PlayerScore from "./PlayerScore";

export default class GameState {
    public playerScores: PlayerScore[];
    @observable public shooterName: string;
    @observable public gameCompleted: boolean = false;
    public winner: PlayerScore = null;
    public turnThrowCount: number = 0;

    private shooterIndex: number = 0;

    public constructor(playerScores: PlayerScore[]) {
        this.playerScores = playerScores;
        this.shooterName = playerScores[0].player.name;
    }

    public get shooter(): PlayerScore {
        return this.playerScores[this.shooterIndex];
    }

    public setWinner(winner: PlayerScore): void {
        this.winner = winner;
        this.gameCompleted = true;
    }
    
    public recordThrow(dartThrow: DartThrow): void {
        this.shooter.scoreThrow(dartThrow);
        this.turnThrowCount++;
        if (this.turnThrowCount === 3) {
            this.turnThrowCount = 0;
            this.nextShooter();
        }
    }

    public undoThrow() {
        this.shooter.undoThrow();
    }

    private nextShooter() {
        this.shooterIndex++;
        if (this.shooterIndex === this.playerScores.length) {
            this.shooterIndex = 0;
            this.playerScores.forEach((ps) => ps.nextTurn());
        }
        this.shooterName = this.playerScores[this.shooterIndex].player.name;
    }
}
