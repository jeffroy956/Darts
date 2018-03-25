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
            <div className="form-container">
                <div className="form-header">
                    <h1><Link to="/"><i className="material-icons">arrow_back</i></Link> Players</h1>
                    <div className="form-header__command">
                        <i className="material-icons">person_add</i>
                    </div>
                </div>
                <div className="form-body">
                    {players && <PlayerList players={players} />}
                </div>
                <div className="form-footer">
                    <div className="link-button link-button--full-width">
                        <Link to="/new-player">Add New Player</Link>
                        <i className="material-icons">add_circle</i>
                    </div>
                </div>
            </div>
        );
    }
}
