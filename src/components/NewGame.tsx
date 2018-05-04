import { inject, observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import GameStore from "../stores/GameStore";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

require("./NewGame.scss");

interface NewGameProps {
    gameStore?: GameStore;
}

@inject("gameStore")
@observer
export default class NewGame extends React.Component<NewGameProps> {

    public render() {
        const {selectedPlayers, availableGames, selectedGame} = this.props.gameStore;
        return (
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="New Game" 
                        backLinkTo="/"
                    />
                }
            >
                <div className="form-body">
                    <div className="new-game__players">
                        <i className="material-icons">people</i>
                        <span>
                        {(selectedPlayers && selectedPlayers.length > 0) 
                            ? selectedPlayers.map((player) => player.name).join(", ")
                            : "No players selected."
                        }
                        </span>
                    </div>
                    <div className="form-field">
                        <label>Game</label>
                        <select value={selectedGame} onChange={this.handleGameChange}>
                            {availableGames.map((ag) => 
                                <option key={ag} value={ag}>{ag}</option>
                            )}
                        </select>
                    </div>
                </div>
            </InnerPage>
        );
    }

    private handleGameChange = (eventArgs: any) => {
        this.props.gameStore.selectGame(eventArgs.target.value);
    }
}
