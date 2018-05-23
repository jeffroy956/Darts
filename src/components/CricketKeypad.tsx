import * as React from "react";
import { ThrowModifier } from "../models/ThrowModifier";

require("./CricketKeypad.scss");

interface CricketKeypadProps {
    undo: () => void;
    scoreThrow: (boardNumber: number, modifier: ThrowModifier) => void;
}

interface ClicketKeypadState {
    modifier: ThrowModifier;
}

export default class HitMissKeypad extends React.Component<CricketKeypadProps, ClicketKeypadState> {
    private scoreKeys: number[] = [15, 16, 17, 18, 19, 20, 25];

    public constructor(props) {
        super(props);
        this.state = {
            modifier: ThrowModifier.Single
        };
    }

    public render() {
        return (
            <div className="key-pad key-pad--cricket">
                {this.scoreKeys.map((sk) => 
                    <PointKey
                        key={sk} 
                        value={sk} 
                        scoreThrow={this.handleScoreThrow} 
                        modifier={this.state.modifier}
                    />)
                }
                <button onClick={this.miss}>0</button>
                <button className="button--spacer"/>
                <button 
                    className={this.getThrowModifierCss(ThrowModifier.Double)} 
                    onClick={this.doubleModifier}
                >
                Double
                </button>
                <button 
                    className={this.getThrowModifierCss(ThrowModifier.Triple)} 
                    onClick={this.tripleModifier}
                >
                Triple
                </button>
                <button className="button--modifier" onClick={this.undo}>Undo</button>
            </div>
        );
    }

    private getThrowModifierCss(modifierId: ThrowModifier): string {
        let baseClass = "button--modifier";
        if (this.state.modifier === modifierId) {
            baseClass += " modifier--active";
        }
        return baseClass;
    }

    private miss = () => {
        this.props.scoreThrow(0, ThrowModifier.Miss);
    }

    private doubleModifier = () => {
        this.applyModifier(ThrowModifier.Double);
    }

    private tripleModifier = () => {
        this.applyModifier(ThrowModifier.Triple);
    }

    private applyModifier = (targetModifier: ThrowModifier) => {
        this.setState((prevState) => {
            
            if (prevState.modifier === targetModifier) {
                return {
                    modifier: ThrowModifier.Single
                };
            }
            
            return {
                modifier: targetModifier
            };
        });
    }

    private undo = () => {
        this.props.undo();
    }
    
    private handleScoreThrow = (boardNumber: number, modifier: ThrowModifier) => {
        this.props.scoreThrow(boardNumber, modifier);
        this.applyModifier(ThrowModifier.Single);
    }
    
}

interface PointKeyProps {
    value: number;
    modifier: ThrowModifier;
    scoreThrow: (boardNumber: number, modifier: ThrowModifier) => void;
}

// tslint:disable-next-line:max-classes-per-file
export class PointKey extends React.Component<PointKeyProps> {
    public render() {
        return <button onClick={this.scoreThrow}>{this.props.value}</button>;
    }

    private scoreThrow = () => {
        this.props.scoreThrow(this.props.value, this.props.modifier);
    }

}
