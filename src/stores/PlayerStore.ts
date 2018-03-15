import { action, IObservableArray, observable } from "mobx";
import Player from "../models/Player";

export default class PlayerStore {
    public players: IObservableArray<Player>;
    
    constructor(players: Player[]) {
        this.players = observable.array(players);
    }

    @action public addPlayer = (player: Player): void => {
        this.players.push(player);
    }
}
