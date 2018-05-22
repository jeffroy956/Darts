import { inject } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import Player from "../models/Player";
import DartGameStore from "../stores/DartGameStore";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";
import PlayerList from "./PlayerList";
import TextButton from "./TextButton";

interface SelectPlayersProps {
    dartGameStore: DartGameStore;
}

interface SelectedPlayersState {
    selectedPlayers: Player[];
    closeSelection: boolean;
}

@inject("dartGameStore")
export default class SelectPlayers extends React.Component<SelectPlayersProps, SelectedPlayersState> {
    public constructor(props) {
        super(props);
        const {selectedPlayers} = this.props.dartGameStore;
        this.state = {
            selectedPlayers: [...selectedPlayers],
            closeSelection: false
        };
    }
    public render() {
        const {availablePlayers, selectedPlayers} = this.props.dartGameStore;
        
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
                        selectedPlayers={selectedPlayers}
                        onSelectionChanged={this.onSelectionChanged}
                    />
                    <TextButton onClick={this.handleButtonClick} className="button--full-width">
                        Select Players
                    </TextButton>
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
        this.props.dartGameStore.selectPlayers(this.state.selectedPlayers);
        this.setState( () => {
            return {
                closeSelection: true
            };
        });
    }
}
