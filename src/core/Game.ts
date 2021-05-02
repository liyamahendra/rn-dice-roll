import Player from './Player';

export default class Game {
    private totalPlayers: number;
    private totalToScore: number;
    private sequenceOfPlayers: Player[];
    private currentPlayerIndex: number;
    private gameOver: boolean;


    constructor(totalPlayers: number, totalToScore: number) {
        this.totalPlayers = totalPlayers;
        this.totalToScore = totalToScore;
        this.sequenceOfPlayers = [];
        this.currentPlayerIndex = 0;
        this.gameOver = false;
    }

    setPlayerSequence = (randomizedSequence: Player[]) => {
        this.sequenceOfPlayers = randomizedSequence;
    }

    getAllPlayersSequence = (): Player[] => {
        return this.sequenceOfPlayers;
    }

    getCurrentlyPlayingPlayersSequence = (): Player[] => {
        let players = [];
        for (var i = 0; i < this.sequenceOfPlayers.length; i++) {
            if (!this.sequenceOfPlayers[i].isGameComplete()) {
                players.push(this.sequenceOfPlayers[i]);
            }
        }
        return players;
    }

    getCurrentPlayer = (): Player => {
        let player = this.sequenceOfPlayers[this.currentPlayerIndex];
        if(player.isGameComplete()) {
            while(!player.isGameComplete()) {
                ++this.currentPlayerIndex;
                if(this.currentPlayerIndex > this.sequenceOfPlayers.length) {
                    this.currentPlayerIndex = 0;
                }
                player = this.sequenceOfPlayers[this.currentPlayerIndex];
            }
        }

        return player;
    }

    moveToNextPlayer = () => {

        let players = this.getCurrentlyPlayingPlayersSequence();

        if (players.length == 0) {
            this.gameOver = true;
        } else {
            let currentPlayer = this.getCurrentPlayer();
            let currentIndex = this.sequenceOfPlayers.indexOf(currentPlayer);
            let nextPlayerIndex = ++currentIndex;

            if(nextPlayerIndex > this.sequenceOfPlayers.length - 1) {
                nextPlayerIndex = 0;
            }

            console.log("================");
            console.log("1 nextPlayerIndex: ", nextPlayerIndex);
            let nextPlayer = this.sequenceOfPlayers[nextPlayerIndex];
            console.log("nextPlayer.isGameComplete(): ", nextPlayer.isGameComplete());

            if(nextPlayer.isGameComplete()) {
                do {
                    ++nextPlayerIndex;
                    if(nextPlayerIndex >= this.sequenceOfPlayers.length) {
                        nextPlayerIndex = 0;
                    }
                    nextPlayer = this.sequenceOfPlayers[nextPlayerIndex];
                    console.log("LOOP: nextPlayer.isGameComplete(): ", nextPlayer.isGameComplete());
                    console.log("LOOP: nextPlayerIndex: ", nextPlayerIndex);

                    if(!nextPlayer.isGameComplete()) {
                        break;
                    }
                } while(!nextPlayer.isGameComplete())
            }

            this.currentPlayerIndex = nextPlayerIndex;
            console.log("this.currentPlayerIndex: ", this.currentPlayerIndex);
        }
    }

    isGameOver = (): boolean => {
        let players = [];
        for (var i = 0; i < this.sequenceOfPlayers.length; i++) {
            if (!this.sequenceOfPlayers[i].isGameComplete()) {
                players.push(this.sequenceOfPlayers[i]);
            }
        }

        if (players.length == 0) {
            return true;
        } else {
            return false;
        }
    }

}