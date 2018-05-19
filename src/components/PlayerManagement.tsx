import { inject } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import Player from "../models/Player";
import PlayerStore from "../stores/PlayerStore";
import IconButton from "./IconButton";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";
import PlayerList from "./PlayerList";

interface PlayerManagementProps {
    playerStore?: PlayerStore;
}

@inject("playerStore")
export default class PlayerManagement extends React.Component<PlayerManagementProps> {
    public render() {
        const {players, deletePlayer} = this.props.playerStore;

        return (
            <InnerPage 
                pageHeader={<PageHeader 
                    title="Players" 
                    backLinkTo="/" 
                    acceptElement={<IconButton iconName="add" linkTo="/new-player" />} 
                />}
            >
                <PlayerList players={players} onDeleted={deletePlayer} />
            </InnerPage>
        );
    }

}
