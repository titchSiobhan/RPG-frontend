import {PlayerContext} from "./context/playerContext";
import {useContext, useState, useEffect} from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Quests() {
    const {player, setPlayer} = useContext(PlayerContext);
    const [quests, setQuests] = useState([]);


    async function getQuests() {
        const response = await fetch(`${API_URL}quest/quest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
        setQuests(data)
    }

    async function acceptQuest() {
        const response = await fetch(`${API_URL}quest/outcome`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
    }

    async function declineQuest() {
        const response = await fetch(`${API_URL}quest/decline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
    }
            
        useEffect(() => {
            getQuests()
        }, [])
    
    return (
        <>
       
        <p>{quests.Description}</p>
        </>
    )
}

export default Quests