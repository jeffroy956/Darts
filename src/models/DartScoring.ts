import GameState from "./GameState";
import {DartThrow, ThrowModifier} from "./PlayerScore";

export default abstract class DartScoring implements DartScoring {
    public scoreThrow(gameState: GameState, pointValue: number, modifier: ThrowModifier): GameState {
        return gameState;
    }
    public abstract get ScoringFieldSize(): number;
}
