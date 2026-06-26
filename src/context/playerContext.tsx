import { createContext, useState, useEffect } from "react";




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
        const [player, setPlayer] = useState<Player | null>(() => {
        const saved = localStorage.getItem('player');
        return saved ? JSON.parse(saved) : null
})
useEffect(() => {
  if (player !== null) {
     const timeout = setTimeout(() => {
       localStorage.setItem('player', JSON.stringify(player));
     }, 500)
  return () => clearTimeout(timeout);
  }
}, [player])

    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
            {children}
        </PlayerContext.Provider>
    )
}

