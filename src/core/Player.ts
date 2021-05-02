export default class Player {
    private name: string;
    private rank: number;
    private scores: any;
    private totalToScore: number;
    private gameComplete: boolean;

    constructor() {
        this.name = "";
        this.rank = 0;
        this.totalToScore = 0;
        this.scores = [];
        this.gameComplete = false;
    }

    setTotalToScore = (totalToScore: number) => {
        this.totalToScore = totalToScore;
    }

    setPlayerName = (name: string) => {
        this.name = name;
    }

    getPlayerName = () : string => {
        return this.name;
    }

    getRank = () : number => {
        return this.rank;
    }

    addScore = (score: number, rankOnCompletion: number) : void => {
        this.scores.push(score);

        let total = 0;
        for(var i=0; i<this.scores.length; i++) {
            total += this.scores[i];
        }

        if(total >= this.totalToScore) {
            this.gameComplete = true;
            this.rank = rankOnCompletion;
        }
    }

    getAllScore = () : [] => {
        return this.scores;
    }

    getTotalScore = () : number => {
        let total = 0;
        for(var i=0; i<this.scores.length; i++) {
            total += this.scores[i];
        }

        return total;
    }

    isGameComplete = () : boolean => {
        return this.gameComplete;
    }
}