import { ThrowModifier } from "./ThrowModifier";

export default class DartThrow {
    public scoreIndex: number;
    public basePointValue: number;
    public modifier: ThrowModifier;

    public constructor(scoreIndex: number, 
                       basePointValue: number,
                       modifier: ThrowModifier) {
        this.scoreIndex = scoreIndex;
        this.basePointValue = basePointValue;
        this.modifier = modifier;
    }

    public get totalPointValue(): number {
        return this.basePointValue * this.modifier;
    }
}
