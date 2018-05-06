import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import NewGame from "./components/NewGame";
import NewPlayer from "./components/NewPlayer";
import PlayerManagement from "./components/PlayerManagement";
import SelectPlayers from "./components/SelectPlayers";
import GameStore from "./stores/GameStore";
import PlayerStore from "./stores/PlayerStore";

require("./Index.scss");

// replaces mobx useStrict:
configure({enforceActions: true});
const playerStore = new PlayerStore([
    {
        name: "Jeff"
    },
    {
        name: "Joe"
    }
]);

const gameStore = new GameStore(playerStore);

const stores = {
    playerStore,
    gameStore
};

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Switch>
                <Route path="/players" component={PlayerManagement} />
                <Route path="/new-player" component={NewPlayer} />
                <Route path="/new-game/select-players" component={SelectPlayers} />
                <Route path="/new-game" component={NewGame} />
                <Route path="/" component={MainMenu} />
            </Switch>
        </HashRouter>
    </Provider>
    ,
    document.getElementById("app")
);
