import { inject, observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import DartGameStore from "../stores/DartGameStore";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";

require("./NewGame.scss");

interface NewGameProps {
    gameStore?: DartGameStore;
}

interface NewGameState {
    gameStarted: boolean;
}

@inject("gameStore")
@observer
export default class NewGame extends React.Component<NewGameProps, NewGameState> {
    public constructor(props) {
        super(props);

        this.state = {
            gameStarted: false
        };
    }

    public render() {
        if (this.state.gameStarted) {
            return <Redirect to="/scoreboard" />;
        }
        const {selectedPlayers, availableGames, selectedGame, allowNewGame} = this.props.gameStore;
        return (
            <InnerPage 
                pageHeader={
                    <PageHeader 
                        title="New Game" 
                        backLinkTo="/"
                    />
                }
            >
                <div>
                    <Link to="/new-game/select-players">
                        <div className="new-game__players">
                            <i className="material-icons">people</i>
                            <span>
                            {(selectedPlayers && selectedPlayers.length > 0) 
                                ? selectedPlayers.map((player) => player.name).join(", ")
                                : "No players selected."
                            }
                            </span>
                        </div>
                    </Link>
                    <div className="form-field">
                        <label>Game</label>
                        <select value={selectedGame} onChange={this.handleGameChange}>
                            {availableGames.map((ag) => 
                                <option key={ag} value={ag}>{ag}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <button disabled={!allowNewGame} onClick={this.startGame}>Start Game</button>
                    </div>
                </div>
            </InnerPage>
        );
    }

    private handleGameChange = (eventArgs: any) => {
        this.props.gameStore.selectGame(eventArgs.target.value);
    }

    private startGame = () => {
        this.setState(() => {
            return {
                gameStarted: true
            };
        });
    }
}
