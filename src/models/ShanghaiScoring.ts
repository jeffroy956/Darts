import DartScoring from "./DartScoring";
import { DartThrow } from "./DartThrow";
import GameState from "./GameState";
import { ThrowModifier } from "./ThrowModifier";

export default class ShanghaiScoring extends DartScoring {

    protected setWinner(gameState: GameState) {
        const winner = gameState.playerScores.reduce((currentWinner, playerScore) => {
            if (!currentWinner || playerScore.total > currentWinner.total) {
                return playerScore;
            }

            return currentWinner;
        });

        gameState.setWinner(winner);
    }
    
    protected isComplete(gameState: GameState): boolean {
        const numberOfPlayers = gameState.playerScores.length;
        const expectedThrows = numberOfPlayers * this.scoringFieldSize * 3;
        const totalDartsThrown =
                gameState.playerScores
                    .map((ps) => ps.dartsThrown)
                    .reduce((total, value) => total + value);

        return totalDartsThrown >= expectedThrows;
    }
    protected getThrowValue(gameState: GameState, boardNumber: number, modifier: ThrowModifier): DartThrow {
        return  {
            scoreIndex: (gameState.shooter.turnNumber),
            basePointValue: 1,
            modifier
        };
    }
    public get scoringFieldSize(): number {
        return 7;
    }

    public get gameType(): string {
        return "shanghai";
    }

}
