import { mount, shallow } from "enzyme";
import { Provider } from "mobx-react";
import * as React from "react";
import {MemoryRouter} from "react-router";
import PlayerStore from "../stores/PlayerStore";
import PlayerList from "./PlayerList";
import PlayerManagement from "./PlayerManagement";

describe("<PlayerManagement/>", () => {
    it("renders PlayerList and add new player button", () => {
        const playerStore = new PlayerStore([{
            name: "Joe"
        }]);

        const playerManagement = mount(<MemoryRouter><PlayerManagement playerStore={playerStore}/></MemoryRouter>);

        const playerList = playerManagement.find(PlayerList);
        expect(playerList.props().players.length).toBe(1);
    });

    it("PlayerStore is injected by MobX provider", () => {
        const stores = {
            playerStore: new PlayerStore([{
                name: "Joe"
            }])
        };

        const playerManagement = mount(
            <Provider {...stores}>
                <MemoryRouter>
                    <PlayerManagement/>
                </MemoryRouter>
            </Provider>);

        const playerList = playerManagement.find(PlayerList);
        expect(playerList.props().players.length).toBe(1);

    });
});
