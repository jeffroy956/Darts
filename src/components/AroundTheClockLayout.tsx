import { observer } from "mobx-react";
import * as React from "react";
import DartGameStore from "../stores/DartGameStore";
import GameCompleted from "./GameCompleted";
import HitMissKeypad from "./HitMissKeypad";
import PageHeader from "./PageHeader";
import SingleFieldScoreboard from "./SingleFieldScoreboard";

interface AroundTheClockLayoutProps {
    dartGameStore: DartGameStore;
}  

@observer
export default class AroundTheClockLayout extends React.Component<AroundTheClockLayoutProps> {
    public render() {
        const {gameState, scoreThrow, undoThrow} = this.props.dartGameStore;
        return(
            <div className="game-layout">
                <PageHeader title="Around The Clock" backLinkTo="/new-game" />
                <SingleFieldScoreboard gameState={gameState} maxTargetValue={20} />
                {gameState.gameCompleted ?
                    <GameCompleted winnerName={gameState.winner.name} undo={undoThrow} />
                    : 
                    <HitMissKeypad undo={undoThrow} scoreThrow={scoreThrow} />
                }
                
            </div>
        );

    }
}
