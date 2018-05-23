import * as React from "react";
import TextButton from "./TextButton";

interface GameCompletedProps {
    winnerName: string;
    undo: () => void;
}
export default class GameCompleted extends React.Component<GameCompletedProps> {
    public render() {
        return(
        <div className="game-completed">
            <div className="message">{this.props.winnerName} has won the match!</div>
            <TextButton className="button--full-width" onClick={this.props.undo}>Undo Last Throw</TextButton>
        </div>
        );
    }
}
