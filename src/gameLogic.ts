//headshot https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${espnId}.png&w=350&h=254
import { IPlayer, ITeamRelationship } from "./gameModel.mode";


const json = require('./staticFiles/player.json')
const jsonPlayers = require('./staticFiles/allPlayers.json')



export class gameLogic{

    players:string[];

    constructor(){
        this.players = jsonPlayers;

    }
    
    getPlayer(){
        let play:IPlayer = json;
        play.teams.map((t: ITeamRelationship )=>{t.revealed = false; return t})
        return(play)
    };


    guessPlayer(guess:string,player:IPlayer): IPlayer{
        switch(player.name){
    
            case guess:
              console.log("You win!")
              player.teams = [...player.teams.map((t: ITeamRelationship)=>{
                  t.revealed = true;
                  if(t.mates.length > 1){t.mates=[]}
                  return {...t}
              })];
              break;
            default:
                player.teams = [...player.teams.map((t: ITeamRelationship)=>{
                    
                   if(!t.revealed){
                        t.mates.forEach((m:string)=>{
                            if(m === guess){
                                t.revealed = true;
                            }
                        })
                        if(t.revealed){t.mates = [guess]}
                    }
                   
                    return {...t}
                })];
              return player
          }
          console.log(player)
          return {...player}
    }
    
    

}