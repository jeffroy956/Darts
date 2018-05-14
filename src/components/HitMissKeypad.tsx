import * as React from "react";
import { ThrowModifier } from "../models/ThrowModifier";

require("./Keypad.scss");
require("./HitMissKeypad.scss");

interface HitMissKeypadProps {
    undo: () => void;
    scoreThrow: (boardNumber: number, modifier: ThrowModifier) => void;
}

export default class HitMissKeypad extends React.Component<HitMissKeypadProps> {
    public render() {
        return (
            <div className="key-pad key-pad--hit-miss">
                <button onClick={this.miss}>
                    Miss
                </button>
                <button onClick={this.singleHit}>
                    Hit
                </button>
                <button onClick={this.doubleHit}>
                    Double
                </button>
                <button onClick={this.tripleHit}>
                    Triple
                </button>
                <button onClick={this.undo}>
                    Undo
                </button>
            </div>
        );
    }

    private miss = () => {
        this.props.scoreThrow(0, ThrowModifier.Miss);
    }

    private singleHit = () => {
        this.props.scoreThrow(0, ThrowModifier.Single);
    }

    private doubleHit = () => {
        this.props.scoreThrow(0, ThrowModifier.Double);
    }

    private tripleHit = () => {
        this.props.scoreThrow(0, ThrowModifier.Triple);
    }

    private undo = () => {
        this.props.undo();
    }
    
}
