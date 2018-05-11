import { DartThrow } from "./DartThrow";

export default class Turn {
    public throws: DartThrow[] = [];

    public get scoreTotal(): number {
        return this.throws
        .map((dartThrow) => dartThrow.basePointValue * dartThrow.modifier)
        .reduce((total, value) => total + value);
    }
    
    public log(dartThrow: DartThrow) {
        this.throws.push(dartThrow);
    }
}
