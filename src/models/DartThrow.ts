export enum ThrowModifier {
    Miss = 0,
    Single = 1,
    Double = 2,
    Triple = 3
}
export interface DartThrow {
    scoreIndex: number;
    basePointValue: number;
    modifier: ThrowModifier;
}
