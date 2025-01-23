import { StringLiteral } from "typescript";

export interface ITeamRelationship{
    id:number;
    name:string;
    totalRebounds:number;
    avgFouls:number;
    assistTurnoverRatio:number;
    avgMinutes:number;
    year:String;
    minutes:number;
    position:string;
    logo:string;
    record:string;
    standing:string;
    gamesPlayed:number;
    mates:string[];
}

export interface IPlayer{
    name:string;
    espnId:string;
    teams:ITeamRelationship[];
}