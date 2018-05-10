import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

interface BaseballFieldLayoutProps {
    players: Player[];
    innings: number;
}

@observer
export default class BaseballFieldLayout extends React.Component<BaseballFieldLayoutProps> {
    public render() {
        return(
            <div className="game-layout">
                <table className="scoreboard">
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}
