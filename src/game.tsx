import GetPlayer from "./createPlayer";
import { PlayerContext } from "./context/playerContext";
import { useContext } from "react";
import Exploring from "./explore";
import GetRest from "./rest";

function Game() {
    const { player} = useContext(PlayerContext);
    
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

            <Exploring />

            <GetRest />
            
            </>
           }
          
            
        </div>
    )
}


export default Game
