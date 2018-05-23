import { observer } from "mobx-react";
import * as React from "react";
import GameState from "../models/GameState";
import Turn from "../models/Turn";

require("./Scoreboard.scss");

interface SingleFieldScoreboardProps {
    gameState: GameState;
    maxTargetValue?: number;
}

@observer
export default class SingleFieldScoreboard extends React.Component<SingleFieldScoreboardProps> {
    public render() {
        const {playerScores, shooterName} = this.props.gameState;
        return (
            <div className="scoreboard">
                <table>
                    <thead>
                        <tr>
                            <th/>
                            <th/>
                            <th>Target</th>
                            <th colSpan={3}>Turn Score</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {playerScores.map((ps) => 
                            <SingleFieldPlayerScoreboard 
                                key={ps.name}
                                playerName={ps.name}
                                shooterName={shooterName}
                                fieldScores={ps.fieldScores}
                                activeTurn={ps.activeTurn}
                                scoreTotal={ps.total}
                                dartsThrown={ps.dartsThrown}
                                maxTargetValue={this.props.maxTargetValue}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface SingleFieldPlayerScoreboardProps {
    playerName: string;
    shooterName: string;
    fieldScores: number[];
    activeTurn: Turn;
    scoreTotal: number;
    dartsThrown: number;
    maxTargetValue?: number;
}
// tslint:disable-next-line:max-classes-per-file
@observer
export class SingleFieldPlayerScoreboard extends React.Component<SingleFieldPlayerScoreboardProps> {
    public render() {
        const {playerName, fieldScores, scoreTotal, dartsThrown, activeTurn} = this.props;
        const isActive = playerName === this.props.shooterName;

        return (
            <tr className={isActive ? "player--active" : ""}>
                <td className="player-indicator"><i className="material-icons">chevron_right</i></td>
                <td className="player-name">{playerName}</td>
                <td className="field-score--wide">{this.getTargetValue()}</td>
                <td className="field-score--wide">{activeTurn && activeTurn.firstThrow}</td>
                <td className="field-score--wide">{activeTurn && activeTurn.secondThrow}</td>
                <td className="field-score--wide">{activeTurn && activeTurn.thirdThrow}</td>
                <td className="player-indicator"><i className="material-icons">chevron_left</i></td>
            </tr>
        );
    }

    private getTargetValue(): number {
        const targetValue = this.props.scoreTotal + 1;
        if (this.props.maxTargetValue && targetValue > this.props.maxTargetValue) {
            return this.props.maxTargetValue;
        }
        return targetValue;
    }

}
