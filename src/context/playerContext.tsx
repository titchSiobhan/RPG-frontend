import { createContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL
import setPlayer from "../createPlayer"



    export type Player = {
    name: string,
    level: number,
    health: number,
    maxHealth: number,
    exp: number,
    maxExp: number,
    energy: number,
    maxEnergy: number,
    inventory: any[],
    coins: number,
    maxCoins: number,
    reputation: number,
    maxReputation: number,
    reputationCategory: string,
    luck: number,
    maxLuck: number,
    luckCategory: string,
    strength: number,
    maxStrength: number,
    defense: number,
    maxDefense: number
}
type PlayerContextType = {
    player: Player | null
    setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;

    
}
export const PlayerContext = createContext<PlayerContextType>({
    player: null,
    setPlayer: () => {}
})
export function PlayerProvider({children}: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player | null>(null)
   useEffect(() => {
    async function loadPlayerFromBackend() {
      try {
        const res = await fetch(`${API_URL}player/`);
        const data = await res.json();
        setPlayer(data);
      } catch (err) {
        console.error("Failed to load player", err);
      }
    }

    loadPlayerFromBackend();
  }, []);
    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
            {children}
        </PlayerContext.Provider>
    )
}

