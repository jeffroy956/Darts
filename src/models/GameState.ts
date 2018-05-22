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
    private totalThrowCount: number = 0;

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
        this.totalThrowCount++;
        if (this.turnThrowCount === 3) {
            this.turnThrowCount = 0;
            this.nextShooter();
        }
    }

    public undoThrow() {
        if (this.totalThrowCount === 0) {
            return;
        }
        if (this.shooter.activeTurn.throws.length === 0) {
            this.previousShooter();
            this.turnThrowCount = 2;
        } else {
            this.turnThrowCount--;
        }
        this.totalThrowCount--;
        this.resetWinner();
        this.shooter.undoThrow();
    }

    private resetWinner(): void {
        this.winner = null;
        this.gameCompleted = false;
    }

    private nextShooter() {
        this.shooterIndex++;
        if (this.shooterIndex === this.playerScores.length) {
            this.shooterIndex = 0;
            this.playerScores.forEach((ps) => ps.nextTurn());
        }
        this.shooterName = this.playerScores[this.shooterIndex].player.name;
    }

    private previousShooter() {
        this.shooterIndex--;
        if (this.shooterIndex < 0) {
            this.shooterIndex = this.playerScores.length - 1;
            this.playerScores.forEach((ps) => ps.cancelTurn());
        }
        this.shooterName = this.playerScores[this.shooterIndex].player.name;
    }
}
