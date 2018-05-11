import { DartThrow, ThrowModifier } from "./DartThrow";
import GameState from "./GameState";

export default abstract class DartScoring implements DartScoring {
    public scoreThrow(gameState: GameState, boardNumber: number, modifier: ThrowModifier): void {
        const dartThrow = this.getThrowValue(gameState, boardNumber, modifier);
        gameState.recordThrow(dartThrow);
    }

    protected abstract getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow;
    public abstract get ScoringFieldSize(): number;
}
