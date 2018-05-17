import { action, IObservableArray, observable } from "mobx";
import { PlayerStorage } from "../api/PlayerStorage";
import Player from "../models/Player";

export default class PlayerStore {
    public players: IObservableArray<Player>;
    
    private playerStorage: PlayerStorage;

    constructor(playerStorage: PlayerStorage) {
        this.players = observable.array(playerStorage.getPlayers());
        this.playerStorage = playerStorage;
    }

    @action public addPlayer = (player: Player): void => {
        this.players.push(player);
        this.playerStorage.save(this.players);
    }
}
