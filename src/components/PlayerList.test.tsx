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

    it("renders a list of players and allows selection", () => {
        const players: Player[] = [
            {
                name: "Mike"
            }
        ];

        const playerList = shallow(<PlayerList players={players} allowSelection={true} />);

        const playerItem = playerList.find(PlayerListItem).at(0).dive();

        expect(playerItem.find("input[type='checkbox']").length).toBe(1);
    });

    it("initially sets selected players", () => {
        const players: Player[] = [
            {
                name: "Mike"
            },
            {
                name: "Amanda"
            }
        ];

        const playerList = shallow(
            <PlayerList 
                players={players}
                allowSelection={true}
                selectedPlayers={[players[0]]}
            />
        );

        const firstPlayerItem = playerList.find(PlayerListItem).at(0).dive();
        expect(firstPlayerItem.find("input[type='checkbox']").props().checked).toBe(true);

        const secondPlayerItem = playerList.find(PlayerListItem).at(1).dive();
        expect(secondPlayerItem.find("input[type='checkbox']").props().checked).toBe(false);
    });

    it("selects a player", () => {
        const players: Player[] = [
            {
                name: "Mike"
            },
            {
                name: "Amanda"
            }
        ];

        const onSelectionChanged = jest.fn();

        const playerList = shallow(
            <PlayerList 
                players={players}
                allowSelection={true}
                selectedPlayers={[]}
                onSelectionChanged={onSelectionChanged}
            />
        );

        const firstPlayerItem = playerList.find(PlayerListItem).at(0).dive();
        
        // https://github.com/airbnb/enzyme/issues/216
        firstPlayerItem.find("input[type='checkbox']").simulate("change", { target: { checked: true } });
        
        expect(onSelectionChanged).toBeCalledWith(players[0], true);
    });

});
