import { DartThrow } from "./DartThrow";
import Player from "./Player";
import PlayerScore from "./PlayerScore";

export default class GameState {
    public playerScores: PlayerScore[];
    private shooterIndex: number = 0;
    private throwCount: number = 0;

    public constructor(playerScores: PlayerScore[]) {
        this.playerScores = playerScores;
    }

    public get shooter(): PlayerScore {
        return this.playerScores[this.shooterIndex];
    }

    public recordThrow(dartThrow: DartThrow): void {
        this.shooter.tally(dartThrow);
        this.throwCount++;
        if (this.throwCount === 3) {
            this.throwCount = 0;
            this.shooterIndex++;
            if (this.shooterIndex === this.playerScores.length) {
                this.shooterIndex = 0;
            }
        }
    }
}
