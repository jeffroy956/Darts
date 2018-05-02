import { action, computed, IObservableArray, observable } from "mobx";
import Player from "../models/Player";
import PlayerStore from "./PlayerStore";

export default class GameStore {
    @observable public selectedPlayers: IObservableArray<Player> = observable.array([]);
    public availableGames: string[] = ["Baseball", "Cricket"];
    @observable public selectedGame: string = "Baseball";

    private playerStore: PlayerStore;
    
    public constructor(playerStore: PlayerStore) {
        this.playerStore = playerStore;
    }

    @computed public get availablePlayers(): IObservableArray<Player>  {
        return this.playerStore.players;
    }

    @action
    public selectPlayer = (name: string) => {
        const foundPlayer = this.availablePlayers.find((player) => player.name === name);
        if (foundPlayer) {
            this.selectedPlayers.push(foundPlayer);
        }
    }

    @action
    public deselectPlayer = (name: string) => {
        this.selectedPlayers.remove(this.selectedPlayers.find((player) => player.name === name));
    }

    @action
    public selectGame = (game: string) => {
        this.selectedGame = game;
    }

}
