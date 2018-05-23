import { observable } from "mobx";
import DartThrow from "./DartThrow";

export default class Turn {
    public throws: DartThrow[] = [];
    @observable public firstThrow: number = null;
    @observable public secondThrow: number = null;
    @observable public thirdThrow: number = null;

    public get scoreTotal(): number {
        return this.throws
        .map((dartThrow) => dartThrow.totalPointValue)
        .reduce((total, value) => total + value);
    }

    public undoThrow(): DartThrow {
        const undoneThrow = this.throws.pop();
        if (this.throws.length < 3) {
            this.thirdThrow = null;
        }
        if (this.throws.length < 2) {
            this.secondThrow = null;
        }
        if (this.throws.length < 1) {
            this.firstThrow = null;
        }
        return undoneThrow;
    }
    
    public log(dartThrow: DartThrow) {
        this.throws.push(dartThrow);
        if (this.throws.length === 1) {
            this.firstThrow = dartThrow.totalPointValue;
        } else if (this.throws.length === 2) {
            this.secondThrow = dartThrow.totalPointValue;
        } else {
            this.thirdThrow = dartThrow.totalPointValue;
        }
    }
}
