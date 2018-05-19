import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import Turn from "../models/Turn";

require("./Scoreboard.scss");

interface AroundTheClockScoreboardProps {
    gameState: GameState;
}

@observer
export default class AroundTheClockScoreboard extends React.Component<AroundTheClockScoreboardProps> {
    public render() {
        const {playerScores, shooterName} = this.props.gameState;
        return (
            <div className="scoreboard">
                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>Target</th>
                            <th colSpan={3}>Turn Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerScores.map((ps) => 
                            <AroundTheClockPlayerScoreboard 
                                key={ps.name}
                                playerName={ps.name}
                                shooterName={shooterName}
                                fieldScores={ps.fieldScores}
                                activeTurn={ps.turns[ps.turns.length - 1]}
                                scoreTotal={ps.total}
                                dartsThrown={ps.dartsThrown}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface AroundTheClockPlayerScoreboardProps {
    playerName: string;
    shooterName: string;
    fieldScores: number[];
    activeTurn: Turn;
    scoreTotal: number;
    dartsThrown: number;
}
// tslint:disable-next-line:max-classes-per-file
@observer
export class AroundTheClockPlayerScoreboard extends React.Component<AroundTheClockPlayerScoreboardProps> {
    public render() {
        const {playerName, fieldScores, scoreTotal, dartsThrown} = this.props;
        const isActive = playerName === this.props.shooterName;

        return (
            <tr className={isActive ? "player--active" : ""}>
                <td className="player-indicator"><i className="material-icons">chevron_right</i></td>
                <td>{playerName}</td>
                <td>{scoreTotal + 1}</td>
                <td className="player-indicator"><i className="material-icons">chevron_left</i></td>
            </tr>
        );
    }
}
