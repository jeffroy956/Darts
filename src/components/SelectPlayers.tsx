import { inject } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import Player from "../models/Player";
import GameStore from "../stores/GameStore";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";
import PlayerList from "./PlayerList";

interface SelectPlayersProps {
    gameStore: GameStore;
}

interface SelectedPlayersState {
    selectedPlayers: Player[];
    closeSelection: boolean;
}

@inject("gameStore")
export default class SelectPlayers extends React.Component<SelectPlayersProps, SelectedPlayersState> {
    public constructor(props) {
        super(props);
        const {selectedPlayers} = this.props.gameStore;
        this.state = {
            selectedPlayers: [...selectedPlayers],
            closeSelection: false
        };
    }
    public render() {
        const {availablePlayers, selectedPlayers} = this.props.gameStore;
        
        if (this.state.closeSelection ) {
            return <Redirect to="/new-game" />;
        }

        return(
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="Select Players" 
                        backLinkTo="/new-game"
                    />
                }
            >
                <div className="select-players">
                    <PlayerList 
                        players={availablePlayers} 
                        allowSelection={true} 
                        selectedPlayers={selectedPlayers}
                        onSelectionChanged={this.onSelectionChanged}
                    />
                    <input type="button" value="Select Players" onClick={this.handleButtonClick} />
                </div>
            </InnerPage>
        );
    }
    private onSelectionChanged = (target: Player, selected: boolean) => {
        const selectedPlayers = this.state.selectedPlayers;

        if (selected) {
            selectedPlayers.push(target);
        } else {
            selectedPlayers.splice(selectedPlayers.indexOf(target), 1);
        }
        this.setState(() => {
            return {
                selectedPlayers
            };
        });
    }
    private handleButtonClick = () => {
        this.props.gameStore.selectPlayers(this.state.selectedPlayers);
        this.setState( () => {
            return {
                closeSelection: true
            };
        });
    }
}
