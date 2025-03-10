import React, { useEffect, useReducer } from 'react';
import './App.css';
import { AppHeader } from './header';
import { gameLogic } from './gameLogic';
import { TeamCard } from './teamCard';
import { useState } from 'react';
import { IPlayer, ITeamRelationship, gameStatus } from "./gameModel.mode";
import { WinnerCard } from './winner';
import Select, {SingleValue,ActionMeta} from 'react-select';



function App() {

  const Logic = new gameLogic();


  const [player, setPlayer] = useState<IPlayer>(Logic.getPlayer());
  const [status, setStatus] = useState<gameStatus>(Logic.status);



  const handlePlayerSelect = (newValue: SingleValue<{ label: string; value: string; }>, actionMeta: ActionMeta<{ label: string; value: string; }>) => {

    if(newValue){
      let newPlayer = Logic.guessPlayer(newValue.value, player);
      setStatus(Logic.status);
      setPlayer({ ...newPlayer })
    }



  }

  useEffect(() => {
    console.log("player changed")

    console.log(player)
  }, [player])

  return (
    <div className="App content-center">
      <AppHeader></AppHeader>


      <div className="items-center justify-center h-screen bg-blue-500 bg-opacity-5">

        <p>
          A simple game to see if you know ball!
          Every day we choose a different NBA player to test you knowledge on.
          Below is a list of all the teams that player has been on, only blurred.
          If you guess the player you win! If you guess a teammate, you unlock that team, as a hint. Good luck!
        </p>

        {status === gameStatus.Lost || status === gameStatus.Won ?
          <WinnerCard player={player} status={status}></WinnerCard>
          :
          null
        }


        <form className="max-w-sm mx-auto">


      

          <label htmlFor="playerDrop" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a player</label>
          <Select   onChange={handlePlayerSelect} id="playerDrop" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        options= {Logic.players.map((p) => {
          return (
            {label: p, value: p}
          )
        })}
      />
        </form>


        <div className="flex tems-center justify-center">

          <table >
            <tr className="border border-gray-300 px-4 py-2">
              <th className="w-1/2">Team</th>
              <th className="w-1/4">Record</th>
              <th className="w-1/4">Stats</th>
            </tr>


            {player.teams.map((t) => {
              return (
                <tr className="border border-gray-300 px-4 py-2"><TeamCard team={t} ></TeamCard> </tr>
              )
            })}

          </table>
        </div>


      </div>
    </div>
  );
}

export default App;
