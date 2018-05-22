import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import DartScoring from "../models/DartScoring";
import GameState from "../models/GameState";
import DartGameStore from "../stores/DartGameStore";
import CricketKeypad from "./CricketKeypad";
import CricketScoreboard from "./CricketScoreboard";
import PageHeader from "./PageHeader";

require("./GameLayout.scss");

interface CricketLayoutProps {
    dartGameStore: DartGameStore;
}

@observer
export default class CricketLayout extends React.Component<CricketLayoutProps> {
    public render() {
        const {gameState, scoreThrow, undoThrow} = this.props.dartGameStore;
        return(
            <div className="game-layout">
                <PageHeader title="Cricket (no points)" backLinkTo="/new-game" />
                <CricketScoreboard gameState={gameState} />
                {gameState.gameCompleted ?
                    <div className="message">{gameState.winner.name} has won the match!</div>
                    : 
                    <CricketKeypad undo={undoThrow} scoreThrow={scoreThrow} />
                }
                
            </div>
        );
    }
}
