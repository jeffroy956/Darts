import { shallow } from "enzyme";
import * as React from "react";
import Player from "../models/Player";
import PlayerList, {PlayerListItem} from "./PlayerList";

describe("<PlayersList/>", () => {
    it("renders a list of players", () => {
        const players: Player[] = [
            {
                name: "Jeff"
            },
            {
                name: "Mary"
            }
        ];

        const playerList = shallow(<PlayerList players={players}/>);

        const playerListItems = playerList.find(PlayerListItem);
        expect(playerListItems.length).toBe(2);
        expect(playerListItems.first().props().player).toBe(players[0]);
    });

});
