import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";
import IconButton from "./IconButton";

require("./PlayerList.scss");

interface PlayerListProps {
    players: Player[];
    allowSelection?: boolean;
    selectedPlayers?: Player[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
    onDeleted?: (target: Player) => void;
}

@observer
export default class PlayerList extends React.Component<PlayerListProps> {
    public render() {
        const {players, allowSelection, selectedPlayers, onSelectionChanged, onDeleted} = this.props;
        return(
            <div className="player-list">
                <ul className="site-list">
                    {
                        players.map((player) => {
                            return (
                                <PlayerListItem 
                                    key={player.name} 
                                    player={player}
                                    selectedPlayers={selectedPlayers}
                                    allowSelection={allowSelection}
                                    onSelectionChanged={onSelectionChanged}
                                    onDeleted={onDeleted}
                                />
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

interface PlayerListItemProps {
    player: Player;
    allowSelection?: boolean;
    selectedPlayers?: Player[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
    onDeleted?: (target: Player) => void;
}

interface PlayerListItemState {
    selected: boolean;
}
// tslint:disable-next-line:max-classes-per-file
export class PlayerListItem extends React.Component<PlayerListItemProps, PlayerListItemState> {
    public constructor(props: PlayerListItemProps) {
        super(props);
        if (props.allowSelection && props.selectedPlayers) {
            this.state = {
                selected: props.selectedPlayers.some((sp) => sp.name === props.player.name)
            };
        } else {
            this.state = {
                selected: false
            };
        }
    }

    public render() {
        return (
            <li>
                <label>
                    {this.props.allowSelection && 
                        <input 
                            type="checkbox" 
                            checked={this.state.selected}
                            onChange={this.handleChange}
                        />
                    }
                    <span>
                        {this.props.player.name}
                    </span>
                    {this.props.onDeleted &&
                        <IconButton iconName="delete" clickCommand={this.handleDelete} />
                    }
                </label>
            </li>
        );        
    }

    private handleDelete = () => {
        this.props.onDeleted(this.props.player);
    }

    private handleChange = () => {
        const playerSelected = !this.state.selected;

        this.setState(() => {
            return {
                selected: playerSelected
            };
        });
        
        const {onSelectionChanged, player} = this.props;
        if (onSelectionChanged) {
            onSelectionChanged(player, playerSelected);
        }

    }
}
