import { observer } from "mobx-react";
import * as React from "react";
import Player from "../models/Player";

interface PlayerListProps {
    players: Player[];
    allowSelection?: boolean;
    selectedPlayers?: string[];
    onSelectionChanged?: (target: Player, selected: boolean) => void;
}

@observer
export default class PlayerList extends React.Component<PlayerListProps> {
    public render() {
        const {players, allowSelection, selectedPlayers, onSelectionChanged} = this.props;
        return(
            <div>
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
    selectedPlayers?: string[];
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
                selected: props.selectedPlayers.some((sp) => sp === props.player.name)
            };
        }
    }

    public render() {
        return (
            <li>
                <label>{this.props.player.name}
                {this.props.allowSelection && 
                    <input 
                        type="checkbox" 
                        checked={this.state.selected}
                        onChange={this.handleChange}
                    />
                }
                </label>
            </li>
        );        
    }

    private handleChange = () => {
        this.setState((prevState) => {
            return {
                selected: !prevState.selected
            };
        });
        
        const {onSelectionChanged, player} = this.props;
        if (onSelectionChanged) {
            onSelectionChanged(player, this.state.selected);
        }

    }
}
