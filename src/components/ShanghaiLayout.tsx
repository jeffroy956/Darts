import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import DartScoring from "../models/DartScoring";
import GameState from "../models/GameState";
import DartGameStore from "../stores/DartGameStore";
import HitMissKeypad from "./HitMissKeypad";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

interface ShanghaiLayoutProps {
    dartGameStore: DartGameStore;
}

@observer
export default class ShanghaiLayout extends React.Component<ShanghaiLayoutProps> {
    public render() {
        const {gameState, scoreThrow} = this.props.dartGameStore;
        return(
            <div className="game-layout">
                <ShanghaiScoreboard gameState={gameState} />
                <HitMissKeypad undo={null} scoreThrow={scoreThrow} />
            </div>
        );
    }
}
