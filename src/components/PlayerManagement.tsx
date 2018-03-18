import { inject } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import Player from "../models/Player";
import PlayerStore from "../stores/PlayerStore";
import PlayerList from "./PlayerList";

require("./PlayerManagement.scss");

interface PlayerManagementProps {
    playerStore?: PlayerStore;
}

@inject("playerStore")
export default class PlayerManagement extends React.Component<PlayerManagementProps> {
    public render() {
        const players: Player[] = (this.props.playerStore ? this.props.playerStore.players : null);

        return (
            <div>
                <h1><Link to="/"><i className="material-icons">arrow_back</i></Link> Players</h1>
                {players && <PlayerList players={players} />}
                <div className="link-button link-button--full-width">
                    <Link to="/new-player">Add New Player</Link>
                </div>
            </div>
        );
    }
}
