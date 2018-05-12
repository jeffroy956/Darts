import { IObservableArray } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

interface ScoreboardProps {
    players: IObservableArray<Player>;
    // game: Game;
}

@observer
export default class Scoreboard extends React.Component<{}> {
    public render() {
        return(
            <div>
                Hello scoreboard
            </div>
        );
    }
}
