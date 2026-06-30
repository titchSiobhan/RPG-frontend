import { PlayerContext } from './context/playerContext';
import { useContext } from 'react';
import Fight from './fight';
import Quests from './quest';
export type GameMode = 'idle' | 'quest' | 'fight' | 'event';
export type isFight = boolean;
import type { Message } from './message';
import Events from './event';
import type { MiniMessage } from './miniMessage';


export type ModeProps = {
	mode: GameMode;
	setMode: React.Dispatch<React.SetStateAction<GameMode>>;
	setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
	setMiniMessage: React.Dispatch<React.SetStateAction<MiniMessage | null>>;
};

export type MessageProps = {
	miniMessage: MiniMessage | null;
};
function Exploring({ mode, setMessage, setMode, setMiniMessage }: ModeProps	) {
	const { player, setPlayer } = useContext(PlayerContext);
	const exploreChoice = ['quest', 'fight', 'event'] as const;

	async function getRandomExplore() {
		if (!player) return;
		if (player.energy < 5) {
			setMode('idle');
			setMessage((prev) => ({
				message: [...(prev?.message ?? []), 'You are too tired to explore'],
			}));
			setMiniMessage({ messages: ['You are too tired to explore'] });
			return;
		}
		if (player.health < 5) {
			setMode('idle');
			setMessage((prev) => ({
				message: [...(prev?.message ?? []), 'Heal your wounds first'],
			}));
			setMiniMessage({ messages: ['Heal your wounds first'] });
			return;
		}
		
		const choice =
			exploreChoice[Math.floor(Math.random() * exploreChoice.length)];
		console.log(choice);
		player.energy -= 5;
		setPlayer(player);
		

		setMode(choice);
	}

	return (
		<div>
			{mode === 'idle' && (
				<button onClick={() => player && getRandomExplore()}>Explore</button>
			)}

			{mode === 'quest' && (
				<Quests
					mode={mode}
					setMode={setMode}
					setMessage={setMessage}
					setMiniMessage={setMiniMessage}
				/>
			)}
			{mode === 'fight' && (
				<Fight
					mode={mode}
					setMode={setMode}
					setMessage={setMessage}
					setMiniMessage={setMiniMessage}
				/>
			)}
			{mode === 'event' && (
				<Events
					mode={mode}
					setMode={setMode}
					setMessage={setMessage}
					setMiniMessage={setMiniMessage}
				/>
			)}
		</div>
	);
}

export default Exploring;
