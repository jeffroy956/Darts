import { inject, observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import DartGameStore from "../stores/DartGameStore";
import InnerPage from "./InnerPage";
import PageHeader from "./PageHeader";
import TextButton from "./TextButton";

require("./NewGame.scss");

interface NewGameProps {
    dartGameStore?: DartGameStore;
}

interface NewGameState {
    gameStarted: boolean;
}

@inject("dartGameStore")
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
            return <Redirect to="/dart-game" />;
        }
        const {selectedPlayers, availableGames, selectedGame, allowNewGame} = this.props.dartGameStore;
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
                    <Link to="/new-game/select-players" className="new-game__players">
                        <i className="material-icons">people</i>
                        <span>
                        {(selectedPlayers && selectedPlayers.length > 0) 
                            ? selectedPlayers.map((player) => player.name).join(", ")
                            : "No players selected."
                        }
                        </span>
                    </Link>
                    <div className="form-field form-field--game-select">
                        <label>Game</label>
                        <select value={selectedGame} onChange={this.handleGameChange}>
                            {availableGames.map((ag) => 
                                <option key={ag.value} value={ag.value}>{ag.display}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <TextButton disabled={!allowNewGame} onClick={this.startGame} className="button--full-width">
                            Start Game
                        </TextButton>
                    </div>
                </div>
            </InnerPage>
        );
    }

    private handleGameChange = (eventArgs: any) => {
        this.props.dartGameStore.selectGame(eventArgs.target.value);
    }

    private startGame = () => {
        this.props.dartGameStore.startGame();
        this.setState(() => {
            return {
                gameStarted: true
            };
        });
    }
}
