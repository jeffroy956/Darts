import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import HitMissKeypad from "./HitMissKeypad";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

interface ShanghaiLayoutProps {
    gameState: GameState;
}

@observer
export default class ShanghaiLayout extends React.Component<ShanghaiLayoutProps> {
    public render() {
        return(
            <div className="game-layout">
                <ShanghaiScoreboard gameState={this.props.gameState} />
                <HitMissKeypad undo={} scoreThrow={} />
            </div>
        );
    }
}
