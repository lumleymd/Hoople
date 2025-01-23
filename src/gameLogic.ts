//headshot https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${espnId}.png&w=350&h=254
import { IPlayer } from "./gameModel.mode";


const json = require('./staticFiles/player.json')



export class gameLogic{
    player: IPlayer;

    constructor(){
        this.player = json;
    }
}