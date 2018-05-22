import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import Turn from "../models/Turn";

require("./Scoreboard.scss");

interface CricketScoreboardProps {
    gameState: GameState;
}

export default class CricketScoreboard extends React.Component<CricketScoreboardProps> {
    private scoreFields: number[] = [15, 16, 17, 18, 19, 20, 25];

    public render() {
        const {playerScores, shooterName} = this.props.gameState;
        return (
            <div className="scoreboard">
                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            {this.scoreFields.map((sf) => <th key={sf}>{sf}</th>)}
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerScores.map((ps) => 
                            <CricketPlayerScoreboard 
                                key={ps.name}
                                playerName={ps.name}
                                shooterName={shooterName}
                                fieldScores={ps.fieldScores}
                                dartsThrown={ps.dartsThrown}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface CricketPlayerScoreboardProps {
    playerName: string;
    shooterName: string;
    fieldScores: number[];
    dartsThrown: number;
}
// tslint:disable-next-line:max-classes-per-file
@observer
export class CricketPlayerScoreboard extends React.Component<CricketPlayerScoreboardProps> {
    public render() {
        const {playerName, fieldScores, dartsThrown} = this.props;
        const isActive = playerName === this.props.shooterName;

        return (
            <tr className={isActive ? "player--active" : ""}>
                <td className="player-indicator"><i className="material-icons">chevron_right</i></td>
                <td>{playerName}</td>
                {fieldScores.map((fs, index) => 
                    <td 
                        key={index} 
                        className="field-score"
                    >
                        {this.translateScore(fs)}
                    </td>)}
                <td className="player-indicator"><i className="material-icons">chevron_left</i></td>
            </tr>
        );
    }

    private translateScore(value: number) {
        if (!value) {
            return "";
        } else if (value === 1) {
            return "/";
        } else if (value === 2) {
            return  "X";
        } else {
            return (
                <div className="field--done">
                    <i className="material-icons">clear</i><i className="material-icons">panorama_fish_eye</i>
                </div>
            );
        }        
    }
}
