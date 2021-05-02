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
        if (player.isGameComplete()) {

            let players = [];
            for (var i = 0; i < this.sequenceOfPlayers.length; i++) {
                if (!this.sequenceOfPlayers[i].isGameComplete()) {
                    players.push(this.sequenceOfPlayers[i]);
                }
            }

            if(this.currentPlayerIndex == players.length - 1) {
                this.currentPlayerIndex = 0;
            }

            player = players[this.currentPlayerIndex];
        }

        return player;
    }

    moveToNextPlayer = () => {

        let players = [];
        for (var i = 0; i < this.sequenceOfPlayers.length; i++) {
            if (!this.sequenceOfPlayers[i].isGameComplete()) {
                players.push(this.sequenceOfPlayers[i]);
            }
        }

        this.currentPlayerIndex++;
        if (players.length == 0) {
            this.gameOver = true;
        } else if (this.currentPlayerIndex >= players.length) {
            this.currentPlayerIndex = 0;
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