import DartScoring from "./DartScoring";
import { DartThrow } from "./DartThrow";
import GameState from "./GameState";
import { ThrowModifier } from "./ThrowModifier";

export default class ShanghaiScoring extends DartScoring {

    protected getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow {
        return  {
            scoreIndex: (gameState.shooter.turnNumber),
            basePointValue: 1,
            modifier
        };
    }
    public get scoringFieldSize(): number {
        return 7;
    }

    public get gameType(): string {
        return "shanghai";
    }

}
