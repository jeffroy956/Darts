import DartScoring from "./DartScoring";
import DartThrow from "./DartThrow";
import GameState from "./GameState";
import { ThrowModifier } from "./ThrowModifier";

export default class CricketScoring extends DartScoring {

    protected getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow {
        if (boardNumber === 25 && modifier === ThrowModifier.Triple) {
            return new DartThrow(this.getScoreIndex(boardNumber), 1, ThrowModifier.Double);
        }
        return new DartThrow(this.getScoreIndex(boardNumber), 1, modifier);
    }
    
    protected isComplete(gameState: GameState): boolean {
        return gameState.playerScores.some((ps) => ps.fieldScores.every((fs) => fs >= 3));
    }

    protected setWinner(gameState: GameState): void {
        gameState.setWinner(gameState.playerScores.find((ps) => ps.fieldScores.every((fs) => fs >= 3)));
    }

    public get scoringFieldSize() {
        return 7;
    }

    public get gameType() {
        return "cricket";
    }

    private getScoreIndex(boardNumber: number) {
        if (boardNumber >= 15 && boardNumber <= 20) {
            return boardNumber - 15;
        } else if (boardNumber === 25) {
            return 6;
        }
        return -1;
    }
}
