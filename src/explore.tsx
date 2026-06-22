import { PlayerContext } from './context/playerContext';
import { useContext, useState } from 'react';
import Fight from './fight';
import Quests from './quest';
export type GameMode = 'idle' | 'quest' | 'fight';
function Exploring() {
	const { player, setPlayer } = useContext(PlayerContext);

	const [choice, setChoice] = useState('');

	
	const [mode, setMode] = useState<GameMode>('idle');
	const exploreChoice = ['quest', 'fight'] as const;
	function getRandomExplore() {
		const choices =
			exploreChoice[Math.floor(Math.random() * exploreChoice.length)];
		console.log(choice);

		player && setPlayer({ ...player, energy: player.energy - 5 });

		setMode(choices);
	}

	return (
		<div>
			{mode === 'idle' && (
				<button onClick={() => player && getRandomExplore()}>Explore</button>
			)}

			{mode === 'quest' && <Quests />}
			{mode === 'fight' && <Fight />}
		</div>
	);
}

export default Exploring;
