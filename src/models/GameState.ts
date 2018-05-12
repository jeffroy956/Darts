import { observable } from "mobx";
import { DartThrow } from "./DartThrow";
import Player from "./Player";
import PlayerScore from "./PlayerScore";

export default class GameState {
    public playerScores: PlayerScore[];
    @observable public shooterName: string;
    private shooterIndex: number = 0;
    private throwCount: number = 0;

    public constructor(playerScores: PlayerScore[]) {
        this.playerScores = playerScores;
        this.shooterName = playerScores[0].player.name;
    }

    public get shooter(): PlayerScore {
        return this.playerScores[this.shooterIndex];
    }

    public recordThrow(dartThrow: DartThrow): void {
        this.shooter.tally(dartThrow);
        this.throwCount++;
        if (this.throwCount === 3) {
            this.throwCount = 0;
            this.nextShooter();
        }
    }

    private nextShooter() {
        this.shooterIndex++;
        if (this.shooterIndex === this.playerScores.length) {
            this.shooterIndex = 0;
        }
        this.shooterName = this.playerScores[this.shooterIndex].player.name;
    }
}
