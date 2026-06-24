import { useState, useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { PlayerContext } from "./context/playerContext";
import type { Player } from "./context/playerContext";



 

function GetPlayer() {
    
const [name, setName] = useState('');
const { player, setPlayer } = useContext(PlayerContext);
async function createPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${API_URL}player/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            name: name
        })
    }) 
    const data: Player = await response.json()
    console.log(data)
    setPlayer(data) // Set the player data
}

return (
    <>
    <form onSubmit={createPlayer} className="create-player-form">
        <h1 className="create-player">Name</h1>
        <input type="text" name="name" id="name" onChange={(event) => setName(event.target.value)}/>
        <button type="submit">Submit</button>
    </form>
    {player && (
        <div>
          <h2>Player Created:</h2>
          <p>Name: {player.name}</p>
          <p>Level: {player.level}</p>
        </div>
      )}
    </>
)
}


export default GetPlayer