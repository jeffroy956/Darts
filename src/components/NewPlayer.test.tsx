import { mount, shallow } from "enzyme";
import { Provider } from "mobx-react";
import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import PlayerStore from "../stores/PlayerStore";
import IconButton from "./IconButton";
import NewPlayer from "./NewPlayer";
import PlayerManagement from "./PlayerManagement";

describe("<NewPlayer/>", () => {
    let stores: any;

    beforeEach(() => {
        stores = {
            playerStore: new PlayerStore([])
        };
    });

    it("shows empty form", () => {
        const playerProvider = mount(
            <Provider {...stores}>
                <MemoryRouter>
                    <NewPlayer/>
                </MemoryRouter>
            </Provider>
        );

        expect(playerProvider.find(NewPlayer).find("input").length).toBe(1);
    });

    it("adds a new player", () => {
        const playerProvider = mount(
            <Provider {...stores}>
                <MemoryRouter initialEntries={[ "/new-player" ]}>
                    <Switch>
                        <Route path="/players" component={PlayerManagement} />
                        <Route path="/new-player" component={NewPlayer} />
                    </Switch>
                </MemoryRouter>
            </Provider>
        );

        const newPlayerForm = playerProvider.find(NewPlayer);
        newPlayerForm.find("input").simulate("change", {target: {value: "John"}});
        const addPlayerButton = newPlayerForm.find(IconButton).instance() as IconButton;
        addPlayerButton.buttonClicked({});

        expect(stores.playerStore.players.length).toBe(1);
        expect(stores.playerStore.players[0].name).toBe("John");
    });
});
