import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import Player from "../models/Player";

require("./Scoreboard.scss");

interface ShanghaiScoreboardProps {
    gameState: GameState;
}

@observer
export default class ShanghaiScoreboard extends React.Component<ShanghaiScoreboardProps> {
    public render() {
        const {playerScores, shooterName} = this.props.gameState;
        return(
            <div className="scoreboard">
                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            {playerScores[0].fieldScores.map((value, index) => 
                                <th key={index}>{index + 1}</th>
                            )}
                            <th>Total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerScores.map((ps) => 
                            <ShanghaiPlayerScoreboard 
                                key={ps.player.name} 
                                shooterName={shooterName}
                                playerName={ps.player.name} 
                                fieldScores={ps.fieldScores} 
                                scoreTotal={ps.total}
                                dartsThrown={ps.dartsThrown}
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
    shooterName: string;
    fieldScores: number[];
    scoreTotal: number;
    dartsThrown: number;
}

// tslint:disable-next-line:max-classes-per-file
export class ShanghaiPlayerScoreboard extends React.Component<ShanghaiPlayerScoreboardProps> {
    public render() {
        const {playerName, fieldScores, scoreTotal, dartsThrown} = this.props;
        const isActive = playerName === this.props.shooterName;
        return(
            <tr className={isActive ? "player--active" : ""}>
                <td className="player-indicator"><i className="material-icons">chevron_right</i></td>
                <td className="player-name"><span>{playerName}</span><span>({dartsThrown})</span></td>
                {fieldScores.map((fs, index) => 
                    <td key={index} className="field-score">{fs}</td>
                )}
                <td className="field-score">{scoreTotal}</td>
                <td className="player-indicator"><i className="material-icons">chevron_left</i></td>
            </tr>
        );
    }
}
