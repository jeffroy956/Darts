import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

interface PlayerListProps {
    players: Player[];
}

@observer
export default class PlayerList extends React.Component<PlayerListProps> {
    public render() {
        const {players} = this.props;
        return(
            <div>
                <ul>
                    {
                        players.map((player) => {
                            return <PlayerListItem key={player.name} player={player}/>;
                        })
                    }
                    <li>hi</li>
                </ul>
            </div>
        );
    }
}

interface PlayerListItemProps {
    player: Player;
}
// tslint:disable-next-line:max-classes-per-file
export class PlayerListItem extends React.Component<PlayerListItemProps> {
    public render() {
        return (
            <li>{this.props.player.name}</li>
        );        
    }
}
