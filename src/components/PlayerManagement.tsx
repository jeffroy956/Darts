import { inject } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";
import PlayerStore from "../stores/PlayerStore";
import PlayerList from "./PlayerList";

interface PlayerManagementProps {
    playerStore?: PlayerStore;
}

@inject("playerStore")
export default class PlayerManagement extends React.Component<PlayerManagementProps> {
    public render() {
        const players: Player[] = (this.props.playerStore ? this.props.playerStore.players : null);

        return (
            <div>
                {players && <PlayerList players={players} />}
            </div>
        );
    }
}
