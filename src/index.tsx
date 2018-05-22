import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { PlayerLocalStorage } from "./api/PlayerStorage";
import DartGame from "./components/DartGame";
import DartRoom from "./components/DartRoom";
import MainMenu from "./components/MainMenu";
import NewGame from "./components/NewGame";
import NewPlayer from "./components/NewPlayer";
import PlayerManagement from "./components/PlayerManagement";
import SelectPlayers from "./components/SelectPlayers";
import Player from "./models/Player";
import DartGameStore from "./stores/DartGameStore";
import PlayerStore from "./stores/PlayerStore";

require("./Index.scss");

// replaces mobx useStrict:
configure({enforceActions: true});
const playerStore = new PlayerStore(new PlayerLocalStorage());

const dartGameStore = new DartGameStore(playerStore);

const stores = {
    playerStore,
    dartGameStore
};

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Switch>
                <Route path="/players" component={PlayerManagement} />
                <Route path="/new-player" component={NewPlayer} />
                <Route path="/new-game/select-players" component={SelectPlayers} />
                <Route path="/new-game" component={NewGame} />
                <Route path="/dart-game" component={DartGame} />
                <Route path="/dart-room" component={DartRoom} />
                <Route path="/" component={MainMenu} />
            </Switch>
        </HashRouter>
    </Provider>
    ,
    document.getElementById("app")
);
