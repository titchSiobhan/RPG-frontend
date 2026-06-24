import { PlayerContext } from './context/playerContext';
import { useContext} from 'react';
import Fight from './fight';
import Quests from './quest';
   export type GameMode = 'idle' | 'quest' | 'fight';
   export type isFight = boolean;
   import type { Message } from './message';
  

   export type ModeProps = {
	mode: GameMode;
    setMode: React.Dispatch<React.SetStateAction<GameMode>>;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>
    
}
function Exploring({ mode, setMessage, setMode }: ModeProps) {
	const { player, setPlayer } = useContext(PlayerContext);


	const exploreChoice = ['quest', 'fight'] as const;
	
	console.log(mode, 'mode');
	function getRandomExplore() {
		if (!player) return;
		if (player.energy < 5 ) {
			setMode('idle');
			setMessage(prev => ({
            message: [...(prev?.message ?? []),  'You are too tired to explore']
        }))
			return
		}
		if (player.health < 5 ) {
			setMode('idle');
			setMessage(prev => ({
			message: [...(prev?.message ?? []),  'Heal your wounds first']
			
		}))
		return 
	}
		const choice =
			exploreChoice[Math.floor(Math.random() * exploreChoice.length)];
		console.log(choice);

		player && setPlayer({ ...player, energy: player.energy - 5 });

		setMode(choice);
	}


	return (
		<div>
			{mode === 'idle' && (
				<button onClick={() => player && getRandomExplore()}>Explore</button>
			)}

			{mode === 'quest' && <Quests mode={mode} setMode={setMode} setMessage={setMessage}/>}
			{mode === 'fight' &&  <Fight mode={mode} setMode={setMode} setMessage={setMessage} />}
		</div>
	);
}

export default Exploring;
