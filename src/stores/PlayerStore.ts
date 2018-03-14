import { action, IObservableArray, observable } from "mobx";
import Player from "../models/Player";

export default class PlayerStore {
    public players: IObservableArray<Player> = observable.array([]);
    @action public addPlayer = (player: Player): void => {
        this.players.push(player);
    }
}
