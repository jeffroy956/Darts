import * as React from "react";
import { ThrowModifier } from "../models/ThrowModifier";

require("./Keypad.scss");

interface HitMissKeypadProps {
    undo: () => void;
    scoreThrow: (modifier: ThrowModifier) => void;
}

export default class HitMissKeypad extends React.Component<HitMissKeypadProps> {
    public render() {
        return (
            <div className="key-pad">
                <button onClick={this.miss}>
                    Miss
                </button>
                <button onClick={this.singleHit}>
                    Single
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
        this.props.scoreThrow(ThrowModifier.Miss);
    }

    private singleHit = () => {
        this.props.scoreThrow(ThrowModifier.Single);
    }

    private doubleHit = () => {
        this.props.scoreThrow(ThrowModifier.Double);
    }

    private tripleHit = () => {
        this.props.scoreThrow(ThrowModifier.Triple);
    }

    private undo = () => {
        this.props.undo();
    }
    
}
