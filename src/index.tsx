import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import PlayerManagement from "./components/PlayerManagement";
import PlayerStore from "./stores/PlayerStore";

useStrict(true);
const stores = {
    playerStore: new PlayerStore([
        {
            name: "Jeff"
        },
        {
            name: "Joe"
        }
    ])
};

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Switch>
                <Route path="/players" component={PlayerManagement} />
                <Route path="/" component={MainMenu} />
            </Switch>
        </HashRouter>
    </Provider>
    ,
    document.getElementById("app")
);
