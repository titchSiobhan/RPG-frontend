import { PlayerContext } from './context/playerContext';
import { useContext } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import type {ModeProps} from './explore';

function GetRest({setMessage}: ModeProps) {
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
        setMessage(prev => ({
            message: [...(prev?.message ?? []), data.message]
        }))
	}
	return (
		<>
			<button onClick={restButton}>Rest</button>
		</>
	);
}

export default GetRest;
