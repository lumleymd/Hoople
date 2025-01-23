import { ITeamRelationship } from "./gameModel.mode";

type Props = {
    team: ITeamRelationship;
    unlocked: boolean
    }
export function TeamCard({team,unlocked}:Props){
    return(
      
            <>
            <td className="flex ">
            <div className="w-1/6"></div>
            <img className="TeamLogo w-1/5" src={team.logo} alt={team.name}></img>
           
          
                <ul className="pl-10 pt-5 text-left w-2/5">
                    <li>{team.name}</li>
                    <li>{team.year}</li>
                    <li>{team.mates[0]}</li>
                </ul>
                
            
            </td>

           
            <td>
            <ul>
                <li>Record:</li>
                <li>{team.record}</li>
            </ul>
                
            </td>
            <td>
            <ul>
                <li>Average Minutes: {Math.floor(team.avgMinutes)}</li>
                <li>Games Played: {team.gamesPlayed}</li>
            </ul>
               
            </td>
           
           </>
    )
}