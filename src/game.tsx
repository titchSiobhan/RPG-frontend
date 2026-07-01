import GetPlayer from './createPlayer';
import { PlayerContext } from './context/playerContext';
import { useContext, useState, useEffect  } from 'react';
import Exploring from './explore';
import GetRest from './rest';
import Messages from './message';
import type { GameMode } from './explore';
import type { Message } from './message'
import type { MiniMessage } from './miniMessage'
import Settings from './setting';
import MiniMessages from './miniMessage';
import Shop from './shop';
import Inventory from './inventory';
import Achievements from './achievements';
const API_URL = import.meta.env.VITE_API_URL



function Game() {
	const { player } = useContext(PlayerContext);
	const [message, setMessage] = useState<Message | null>(null);
	const [miniMessage, setMiniMessage] = useState<MiniMessage | null>(null);
	const [mode, setMode] = useState<GameMode>('idle');
   const [loading, setLoading] = useState(false);
   async function callBackend(url:string, options?: RequestInit) {
	setLoading(true);
	try{
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} finally {
		setLoading(false);
	}
   }
   useEffect(() => {
  async function wakeServer() {
    await callBackend(`${API_URL}api/ping`); 
  }

  wakeServer();
}, []);


   
   function LoadingScreen() {
	return (
		<div className="loading-screen">
			<h1>Questage</h1>
			<p>Waking up, please wait...</p>
		</div>
	)
   }
  
  
if (loading) {
	return <LoadingScreen />
}
	return (
		<>
		
			{!player  && <GetPlayer />}
			{player && (
				<>
<Settings />
<Achievements />
                <div className="game-control">
					
					<div className="player-stats">
                        <h1>Questage</h1>
						<h2>{player.name}</h2>
						<p>Level: {player.level}</p>
						<p>Exp: {player.exp}</p>
						<p>Health: {player.health}</p>
						<p>Energy: {player.energy}</p>
						<p>Coins: {player.coins}</p>
						{/* <p>
							Reputation:{' '}
							{player.reputationCategory.charAt(0).toUpperCase() +
								player.reputationCategory.slice(1)}
						</p> */}
						<p>
							Luck:{' '}
							{player.luckCategory.charAt(0).toUpperCase() +
								player.luckCategory.slice(1)}
						</p>
					</div>
					
								
					<div className="buttons">
						
							{ mode === 'idle' && (
									<>
                                <Shop miniMessage={miniMessage} setMiniMessage={setMiniMessage}/>
								<Inventory />
						<GetRest
							setMessage={setMessage}
							mode={'idle'}
							setMode={setMode}
							setMiniMessage={setMiniMessage}
						/>
						</>
					)}
                        <Exploring mode={mode} setMessage={setMessage} setMode={setMode} setMiniMessage={setMiniMessage} />
					</div>
					<MiniMessages miniMessage={miniMessage } setMiniMessage={setMiniMessage}/>
                    </div>
							

					<Messages message={message}  />
                    
				</>
			)}
			
		</>
	);
}

export default Game;
