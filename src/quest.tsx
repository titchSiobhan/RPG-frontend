import { PlayerContext } from './context/playerContext';
import { useContext, useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

import type { ModeProps } from './explore';

function Quests({ setMode, setMessage }: ModeProps) {
	
	type Quest = {
		questID: number;
		title: string;
		description: string;
		rewards: any[];
		punishment: any[];
	};

	type Outcome = {
		text: string;
		reward?: any[];
		punishment?: any[];
	};
    
	(PlayerContext);
	const [quests, setQuests] = useState<Quest | null>(null);
  
    const { setPlayer } = useContext(PlayerContext);
	const [outcome, setOutcome] = useState<Outcome | null>(null);


	const questId = quests?.questID;
	

	async function getQuests() {
        try {
		const response = await fetch(`${API_URL}quest/quest`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data: Quest = await response.json();
		console.log(data);
		setQuests(data);
		setMessage(prev => ({
            message: [...(prev?.message ?? []),  data.description]
        }))
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(` Network response was not ok   ${errorData.error}`);
        }
    } catch (error) {
        console.error(error);
    }
	}

	async function acceptQuest() {
        try{
		const response = await fetch(`${API_URL}quest/outcome`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				questId,
			}),
		});
		const data = await response.json();

      
        
		console.log(data.outcome);
		setOutcome(data);
        setMessage(prev => ({
            message: [...(prev?.message ?? []), data.outcome.text]
        }))
        
        setPlayer(data.player)
		setMode("idle");

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(` Network response was not ok   ${errorData.error}`);
        }
    } catch (error) {
        console.error(error);
    }
	}

	async function declineQuest() {
		const response = await fetch(`${API_URL}quest/decline`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
            body: JSON.stringify({
				questId,
			}),
		});
		const data = await response.json();
		console.log(data);
       setPlayer(data.player)
        setMode("idle");
	}

	useEffect(() => {
		getQuests();
	}, []);

	return (
		<>
			{!outcome && (
				<>
					<p>{quests?.description}</p>
					<button onClick={acceptQuest}>Accept</button>
					<button onClick={declineQuest}>Decline</button>
				</>
			)}
			{outcome && <p>{outcome.text}</p>}
		</>
	);
}

export default Quests;
