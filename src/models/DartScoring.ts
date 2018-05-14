import { DartThrow } from "./DartThrow";
import GameState from "./GameState";
import { ThrowModifier } from "./ThrowModifier";

export default abstract class DartScoring implements DartScoring {
    public scoreThrow(gameState: GameState, boardNumber: number, modifier: ThrowModifier): void {
        const dartThrow = this.getThrowValue(gameState, boardNumber, modifier);
        gameState.recordThrow(dartThrow);
    }

    protected abstract getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow;
    public abstract get scoringFieldSize(): number;
    public abstract get gameType(): string;
}
