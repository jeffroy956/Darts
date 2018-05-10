import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

require("./PlayerList.scss");

interface PlayerListProps {
    players: Player[];
    allowSelection?: boolean;
    selectedPlayers?: Player[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
}

@observer
export default class PlayerList extends React.Component<PlayerListProps> {
    public render() {
        const {players, allowSelection, selectedPlayers, onSelectionChanged} = this.props;
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
                </label>
            </li>
        );        
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
