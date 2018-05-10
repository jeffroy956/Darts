import DartScoring from "./DartScoring";
import GameState from "./GameState";
import { DartThrow } from "./PlayerScore";

export default class ShanghaiScoring extends DartScoring {
    public get ScoringFieldSize(): number {
        return 7;
    }
}
