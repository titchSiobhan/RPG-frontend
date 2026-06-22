const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "./context/playerContext";
function Fight() {
    const { player, setPlayer } = useContext(PlayerContext);
const [enemy, setEnemy] = useState<Enemy | null>(null);
const [enemyHealth, setEnemyHealth] = useState(0);
const [playerHealth, setPlayerHealth] = useState(0);
type Enemy = {
    name: string;
    type: any;
    health: number;
    maxHealth: number;
    strength: number;
    defense: number;
}
    async function getEnemy() {
        const response = await fetch(`${API_URL}fight/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data: Enemy = await response.json()
       console.log(data)
        setEnemy(data)
        setEnemyHealth(data.health)
        startFight()
    }
    async function startFight() {
        const response = await fetch(`${API_URL}fight/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(`start fight ${data}`)
        
    }

    async function attack() {
       
        const response = await fetch(`${API_URL}fight/attack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
        setEnemyHealth(data.enemy.health)
            if(data.enemy.health === 0) {
                console.log('he ded', data.player)
                
       setPlayer(prev => ({
        ...prev,
        exp: prev.exp + data.player.exp,
        coins: prev.coins + data.player.coins
       }))
    }
      
    }

    async function enemyAttack() {
        const response = await fetch(`${API_URL}fight/enemyAttack`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
        setPlayer(prev => prev ? { ...prev, health: data.player.health } : prev)

    }

    return (
        <>
            <button onClick={() => getEnemy()}>Get Enemy</button>
            {enemy && enemyHealth > 0 && (
                <>
                    <p>{enemy.name} the {enemy.type.species}</p>
                    <p>{enemyHealth}</p>

                    <button onClick={() => attack()}>Attack</button>
                    
                </>
            )}


        </>
    )
}

export default Fight