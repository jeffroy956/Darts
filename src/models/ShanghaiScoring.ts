import DartScoring from "./DartScoring";
import { DartThrow, ThrowModifier } from "./DartThrow";
import GameState from "./GameState";

export default class ShanghaiScoring extends DartScoring {

    protected getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow {
        return  {
            scoreIndex: (gameState.shooter.turnNumber),
            basePointValue: 1,
            modifier
        };
    }
    public get ScoringFieldSize(): number {
        return 7;
    }

}
