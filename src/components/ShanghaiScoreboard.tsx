import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";

interface ShanghaiScoreboardProps {
    gameState: GameState;
}

@observer
export default class ShanghaiScoreboard extends React.Component<ShanghaiScoreboardProps> {
    public render() {
        const {playerScores} = this.props.gameState;
        return(
            <div className="scoreboard">
                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            {playerScores[0].fieldScores.map((value, index) => 
                                <th key={index}>{index + 1}</th>
                            )}
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerScores.map((ps) => 
                            <ShanghaiPlayerScoreboard 
                                key={ps.player.name} 
                                playerName={ps.player.name} 
                                fieldScores={ps.fieldScores} 
                                scoreTotal={ps.total}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface ShanghaiPlayerScoreboardProps {
    playerName: string;
    fieldScores: number[];
    scoreTotal: number;
}

// tslint:disable-next-line:max-classes-per-file
@observer
export class ShanghaiPlayerScoreboard extends React.Component<ShanghaiPlayerScoreboardProps> {
    public render() {
        const {playerName, fieldScores, scoreTotal} = this.props;

        return(
            <tr>
                <td>{playerName}</td>
                {fieldScores.map((fs, index) => 
                    <td key={index}>{fs}</td>
                )}
                <td>{scoreTotal}</td>
            </tr>
        );
    }
}
