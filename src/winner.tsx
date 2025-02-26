import { IPlayer,gameStatus } from "./gameModel.mode"

type Props = {
    player: IPlayer,
    status:gameStatus
    }
export function WinnerCard({player,status}:Props){
    return(
      
            <div className="border-2 border-solid">
                {status === gameStatus.Won ?
                <a>You Win!</a>
                :
                <a>You Lost...</a>
                }
                
                <br></br>
                <h2>{player.name}</h2>
                <img alt={player.name} src={"https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/"+player.espnId+".png"} ></img>
           
           </div >
    )
}
