import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import DartScoring from "../models/DartScoring";
import GameState from "../models/GameState";
import DartGameStore from "../stores/DartGameStore";
import GameCompleted from "./GameCompleted";
import HitMissKeypad from "./HitMissKeypad";
import PageHeader from "./PageHeader";
import ShanghaiScoreboard from "./ShanghaiScoreboard";

require("./GameLayout.scss");

interface ShanghaiLayoutProps {
    dartGameStore: DartGameStore;
}

@observer
export default class ShanghaiLayout extends React.Component<ShanghaiLayoutProps> {
    public render() {
        const {gameState, scoreThrow, undoThrow} = this.props.dartGameStore;
        return(
            <div className="game-layout">
                <PageHeader title="Shanghai" backLinkTo="/new-game" />
                <ShanghaiScoreboard gameState={gameState} />
                {gameState.gameCompleted ?
                    <GameCompleted winnerName={gameState.winner.name} undo={undoThrow} />
                    : 
                    <HitMissKeypad undo={undoThrow} scoreThrow={scoreThrow} />
                }
                
            </div>
        );
    }
}
