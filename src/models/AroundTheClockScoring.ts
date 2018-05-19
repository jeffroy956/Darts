import DartScoring from "./DartScoring";
import { DartThrow } from "./DartThrow";
import GameState from "./GameState";
import { ThrowModifier } from "./ThrowModifier";

export default class AroundTheClockScoring extends DartScoring {
    protected getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow {
        return {
            scoreIndex: 0,
            basePointValue: 1,
            modifier
        };
    }
    
    protected isComplete(gameState: GameState): boolean {
        return gameState.playerScores.some((ps) => ps.total >= 20);
    }

    protected setWinner(gameState: GameState): void {
        gameState.setWinner(gameState.playerScores.find((ps) => ps.total >= 20));
    }

    public get scoringFieldSize() {
        return 1;
    }

    public get gameType() {
        return "aroundtheclock";
    }
}
