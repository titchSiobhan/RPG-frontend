import { createContext, useState } from "react";



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
    setPlayer: (p: Player | null) => void
    
}
export const PlayerContext = createContext<PlayerContextType>({
    player: null,
    setPlayer: () => {}
})
export function PlayerProvider({children}: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player | null>(null)
    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
            {children}
        </PlayerContext.Provider>
    )
}

