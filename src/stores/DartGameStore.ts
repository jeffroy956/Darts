import { action, computed, IObservableArray, observable } from "mobx";
import DartScoring from "../models/DartScoring";
import GameState from "../models/GameState";
import Player from "../models/Player";
import PlayerScore from "../models/PlayerScore";
import ShanghaiScoring from "../models/ShanghaiScoring";
import { ThrowModifier } from "../models/ThrowModifier";
import PlayerStore from "./PlayerStore";

export default class DartGameStore {
    public selectedPlayers: IObservableArray<Player> = observable.array([]);
    public availableGames: string[] = ["shanghai", "aroundtheclock", "cricket"];
    public gameState: GameState;
    public dartScoring: DartScoring;

    @observable public selectedGame: string = "shanghai";

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

    @action
    public startGame = () => {
        const scoring = this.createGameScoring(this.selectedGame);

        if (scoring && this.selectedPlayers && this.selectedPlayers.length > 0) {
            this.dartScoring = scoring;
            const playerScores = this.selectedPlayers.map((sp) => new PlayerScore(sp, scoring.scoringFieldSize));
            this.gameState = new GameState(playerScores);
        }
    }

    @action
    public scoreThrow = (boardNumber: number, modifier: ThrowModifier): void => {
        this.dartScoring.scoreThrow(this.gameState, boardNumber, modifier);
    }

    private createGameScoring(game: string) {
        switch (game) {
            case "shanghai":
            return new ShanghaiScoring();
        }

        return null;
    }

}
