import { PlayerContext } from './context/playerContext';
import { useContext } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import type {ModeProps} from './explore';

function GetRest({setMiniMessage}: ModeProps) {
	const { player, setPlayer } = useContext(PlayerContext);

	async function restButton() {
		const response = await fetch(`${API_URL}quest/rest`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		console.log(data.player.luck);
        if (!player ) return 
		setPlayer(data.player);
       setMiniMessage( {messages: [data.message]})
	}
	return (
		<>
			<button onClick={restButton}>Rest</button>
		</>
	);
}

export default GetRest;
