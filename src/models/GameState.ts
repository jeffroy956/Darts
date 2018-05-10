import Player from "./Player";
import PlayerScore from "./PlayerScore";

export default class GameState {
    public playerScores: PlayerScore[];
    private shooterIndex: number;

    public constructor(playerScores: PlayerScore[]) {
        this.playerScores = playerScores;
        this.shooterIndex = 0;
    }

    public get shooter(): Player {
        return this.playerScores[this.shooterIndex].player;
    }

    public nextShooter() {
        //
    }
}
