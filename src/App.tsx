import React from 'react';
import './App.css';
import { AppHeader } from './header';
import { gameLogic } from './gameLogic';
import { TeamCard } from './teamCard';

function App() {
  const Logic = new gameLogic();
  return (
    <div className="App content-center">
      <AppHeader></AppHeader>
      <div className="flex items-center justify-center h-screen bg-blue-500 bg-opacity-5">
      <table >
        <tr className="border border-gray-300 px-4 py-2">
          <th className="w-1/2">Team</th>
          <th className="w-1/4">Record</th>
          <th className="w-1/4">Stats</th>
        </tr>
      {Logic.player.teams.map((t)=>{
        return(
          <tr className="border border-gray-300 px-4 py-2"><TeamCard team={t} unlocked={false}></TeamCard></tr>
        )
      })}
      </table>
      </div>
     
      
    </div>
  );
}

export default App;
