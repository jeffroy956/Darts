import { observer } from "mobx-react";
import * as React from "react";
import DartGameStore from "../stores/DartGameStore";
import HitMissKeypad from "./HitMissKeypad";
import PageHeader from "./PageHeader";
import SingleFieldScoreboard from "./SingleFieldScoreboard";

interface AroundTheClockLayoutProps {
    dartGameStore: DartGameStore;
}  

@observer
export default class AroundTheClockLayout extends React.Component<AroundTheClockLayoutProps> {
    public render() {
        const {gameState, scoreThrow} = this.props.dartGameStore;
        return(
            <div className="game-layout">
                <PageHeader title="Around The Clock" backLinkTo="/new-game" />
                <SingleFieldScoreboard gameState={gameState} />
                {gameState.gameCompleted ?
                    <div className="message">{gameState.winner.name} has won the match!</div>
                    : 
                    <HitMissKeypad undo={null} scoreThrow={scoreThrow} />
                }
                
            </div>
        );

    }
}
