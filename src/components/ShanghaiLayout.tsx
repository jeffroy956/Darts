import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

interface ShanghaiLayoutProps {
    players: Player[];
    rounds: number;
}

@observer
export default class ShanghaiLayout extends React.Component<ShanghaiLayoutProps> {
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
