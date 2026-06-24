import GetPlayer from "./createPlayer";
import { PlayerContext } from "./context/playerContext";
import { useContext, useState } from "react";
import Exploring from "./explore";
import GetRest from "./rest";
import Messages from "./message";
import type { GameMode } from "./explore";
import type { Message } from "./message";



function Game() {
    const { player} = useContext(PlayerContext);
   const [message, setMessage] = useState<Message | null>(null);
  const [mode, setMode] = useState<GameMode>('idle');

    return (
        <div>
            
           { !player &&
            <GetPlayer />
           }
           {
            player &&
            <>
            <h1>Player</h1>
            <h2>{player.name}</h2>
            <p>Level: {player.level}</p>
            <p>Exp: {player.exp}</p>
            <p>Health: {player.health}</p>
            <p>Energy: {player.energy}</p>
            <p>Coins: {player.coins}</p>
            <p>Reputation: {player.reputationCategory.charAt(0).toUpperCase() + player.reputationCategory.slice(1)}</p>
            <p>Luck: {player.luckCategory.charAt(0).toUpperCase() + player.luckCategory.slice(1)}</p>

            <Exploring mode={mode} setMessage={setMessage} setMode={setMode} />




            <GetRest />
            <Messages  message={message}/>
            </>
           }
          
            
        </div>
    )
}


export default Game
