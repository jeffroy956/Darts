import { action, computed, IObservableArray, observable } from "mobx";
import Player from "../models/Player";
import PlayerStore from "./PlayerStore";
import { computedDecorator } from "mobx/lib/api/computed";

export default class GameStore {
    public selectedPlayers: IObservableArray<Player> = observable.array([]);
    public availableGames: string[] = ["Baseball", "Cricket"];
    @observable public selectedGame: string = "Baseball";

    private playerStore: PlayerStore;
    
    public constructor(playerStore: PlayerStore) {
        this.playerStore = playerStore;
    }

    @computed public get availablePlayers(): IObservableArray<Player>  {
        return this.playerStore.players;
    }

    @computed public get allowNewGame(): boolean {
        return this.selectedPlayers.length > 0;
    }

    @action public selectPlayers = (players: Player[]) => {
        this.selectedPlayers.replace(players);
    }

    @action
    public selectGame = (game: string) => {
        this.selectedGame = game;
    }

}
