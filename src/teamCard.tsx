import { ITeamRelationship } from "./gameModel.mode";

type Props = {
    team: ITeamRelationship
    }
export function TeamCard({team}:Props){
    return(
      
            <>
            <td className="flex ">
            <div className="w-1/6"></div>
            {team.revealed?
            <img className="TeamLogo w-1/5" src={team.logo} alt={team.name}></img>
            :
            <img className="TeamLogo w-1/5 blur-2xl" src={team.logo} alt={team.name}></img>
}
          
                <ul className="pl-10 pt-5 text-left w-2/5">
                    {team.revealed?
                    <>
                    <li>{team.name}</li>
                    <li>{team.year}</li>
                    <li>{team.mates[0]}</li>
                    </>
                    :
                    <>
                    <li className="blur-sm">xxxxxxxxx xxxxxxxx</li>
                    <li>{team.year}</li>
            
                    </>
}
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