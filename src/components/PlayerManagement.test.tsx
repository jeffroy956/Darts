import { mount, shallow } from "enzyme";
import { Provider } from "mobx-react";
import * as React from "react";
import PlayerStore from "../stores/PlayerStore";
import PlayerList from "./PlayerList";
import PlayerManagement from "./PlayerManagement";

describe("<PlayerManagement/>", () => {
    it("renders PlayerList and add new player button", () => {
        const playerStore = new PlayerStore([{
            name: "Joe"
        }]);

        const playerManagement = mount(<PlayerManagement playerStore={playerStore}/>);

        const playerList = playerManagement.find(PlayerList);
        expect(playerList.props().players.length).toBe(1);
    });

    it("PlayerStore is injected by MobX provider", () => {
        const stores = {
            playerStore: new PlayerStore([{
                name: "Joe"
            }])
        };

        const playerManagement = mount(<Provider {...stores}><PlayerManagement/></Provider>);

        const playerList = playerManagement.find(PlayerList);
        expect(playerList.props().players.length).toBe(1);

    });
});
