import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import NewPlayer from "./components/NewPlayer";
import DartsApp from "./DartsApp";

useStrict(true);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/NewPlayer" component={NewPlayer} />
            <Route path="/" component={MainMenu} />
        </Switch>
    </BrowserRouter>
    ,
    document.getElementById("app")
);
