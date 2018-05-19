import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";
import ConfirmationDialog from "./ConfirmationDialog";
import IconButton from "./IconButton";

require("./PlayerList.scss");

interface PlayerListProps {
    players: Player[];
    selectedPlayers?: Player[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
    onDeleted?: (target: Player) => void;
}

@observer
export default class PlayerList extends React.Component<PlayerListProps> {
    public render() {
        const {players, selectedPlayers, onSelectionChanged, onDeleted} = this.props;
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
    selectedPlayers?: Player[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
    onDeleted?: (target: Player) => void;
}

interface PlayerListItemState {
    selected: boolean;
    confirmVisible: boolean;
}

// tslint:disable-next-line:max-classes-per-file
export class PlayerListItem extends React.Component<PlayerListItemProps, PlayerListItemState> {
    public constructor(props: PlayerListItemProps) {
        super(props);
        if (props.onSelectionChanged && props.selectedPlayers) {
            this.state = {
                selected: props.selectedPlayers.some((sp) => sp.name === props.player.name),
                confirmVisible: false
            };
        } else {
            this.state = {
                selected: false,
                confirmVisible: false
            };
        }
    }

    public render() {
        return (
            <li>
                <label>
                    {this.props.onSelectionChanged && 
                        <input 
                            type="checkbox" 
                            checked={this.state.selected}
                            onChange={this.handleChange}
                        />
                    }
                    <span>
                        {this.props.player.name}
                    </span>
                </label>
                {this.props.onDeleted &&
                    <IconButton 
                        iconName="delete" 
                        className="icon-button--secondary" 
                        onClick={this.confirmDelete} 
                    />
                }
                {this.state.confirmVisible && 
                <ConfirmationDialog onAccept={this.acceptDelete} onCancel={this.cancelDelete}>
                    {`Are you sure you want to delete ${this.props.player.name}?`}
                </ConfirmationDialog>
                }
            </li>
        );        
    }

    private confirmDelete = () => {
        this.setState({
            confirmVisible: true
        });

    }

    private cancelDelete = () => {
        this.setState({
            confirmVisible: false
        });
    }

    private acceptDelete = () => {
        this.setState({
            confirmVisible: false
        });
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
