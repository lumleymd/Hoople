import React, { useEffect,useReducer } from 'react';
import './App.css';
import { AppHeader } from './header';
import { gameLogic } from './gameLogic';
import { TeamCard } from './teamCard';
import { useState } from 'react';
import { IPlayer, ITeamRelationship } from "./gameModel.mode";




function App() {

  const Logic = new gameLogic();


  const [player,setPlayer]= useState<IPlayer>(Logic.getPlayer());



  const handlePlayerSelect =(e: React.ChangeEvent<HTMLSelectElement>) => {
 
    let newPlayer = Logic.guessPlayer(e.target.value,player);
   
    setPlayer({...newPlayer})

    
}

  useEffect(()=>{
    console.log("player changed")

    console.log(player)
  },[player])

  return (
    <div className="App content-center">
      <AppHeader></AppHeader>

      <div className="items-center justify-center h-screen bg-blue-500 bg-opacity-5">
      <form className="max-w-sm mx-auto">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select onChange={handlePlayerSelect} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled selected>Guess a player</option>
              
          {Logic.players.map((p) => {
            return (
              <option >{p}</option>
            )
          })}

              
            </select>
          </form>
        team: {player.teams[0] ?  <a>bomb: {player.teams[0].revealed}</a>:null}  
          

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
