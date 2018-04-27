import { inject } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import Player from "../models/Player";
import PlayerStore from "../stores/PlayerStore";
import { Header } from "./Header";
import IconButton from "./IconButton";
import PlayerList from "./PlayerList";

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
                    <Header title="Players" backLinkTo="/" />
                    <IconButton iconName="add" linkTo="/new-player" />
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
