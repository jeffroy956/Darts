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
                <h2><Link to="/">&lt;-</Link> Players</h2>
                {players && <PlayerList players={players} />}
            </div>
        );
    }
}
