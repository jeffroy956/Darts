import Player from "../models/Player";
import LocalStorage from "./LocalStorage";

export interface PlayerStorage {
    save: (players: Player[]) => void;
    getPlayers: () => Player[];
}

export class PlayerLocalStorage implements PlayerStorage {
    public save(players: Player[]) {
        LocalStorage.storeObject("players", players);
    }

    public getPlayers(): Player[] {
        const players = LocalStorage.getObject<Player[]>("players");
        if (players) {
            return players;
        }

        return [];
    }
}

// tslint:disable-next-line:max-classes-per-file
export class PlayerFakeStorage implements PlayerStorage {
    private players: Player[];

    public constructor(players?: Player[]) {
        if (!players) {
            this.players = [
                {
                    name: "One"  
                },
                {
                    name: "Two"
                }
            ];
        } else {
            this.players = players;
        }
    }
    public save(players: Player[]) {
        this.players = players;
    }

    public getPlayers(): Player[] {
        return this.players;
    }
}
