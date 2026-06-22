import { PlayerContext } from "./context/playerContext";
import { useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function GetRest() {
    const { player, setPlayer } = useContext(PlayerContext);

   async function restButton() {
     const response = await fetch(`${API_URL}quest/rest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data.player.luck)
        setPlayer(prev => ({...prev,
             luck: data.player.luck,
            luckCategory: data.player.luckCategory,
        energy: data.player.energy}))
    }
    return (
        <>
        <button onClick={restButton}>Rest</button> 
        </>
    )
}

export default GetRest