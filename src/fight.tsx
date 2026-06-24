const API_URL = import.meta.env.VITE_API_URL;
import { useState, useContext } from 'react';
import { PlayerContext } from './context/playerContext';

import type { isFight } from './explore';

import type { ModeProps } from './explore';
function Fight({ setMode, setMessage }: ModeProps) {
	const { setPlayer } = useContext(PlayerContext);
	const [enemy, setEnemy] = useState<Enemy | null>(null);
	const [enemyHealth, setEnemyHealth] = useState(0);
	const [isFighting, setIsFighting] = useState<isFight>(false);

	type Enemy = {
		name: string;
		type: any;
		health: number;
		maxHealth: number;
		strength: number;
		defense: number;
	};

	async function startFight() {
		const response = await fetch(`${API_URL}fight/start`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		console.log(`start fight ${data.enemy}`);
        setEnemy(data.currentEnemy);
    setEnemyHealth(data.currentEnemy.health);
    setPlayer(data.player);
    setIsFighting(true);
	}

	async function attack() {
                try {
                const response = await fetch(`${API_URL}fight/attack`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                console.log(data);
                setEnemyHealth(data.enemy.health);
                
                if (data.enemy.health === 0) {
                    console.log('he ded', data.player);

                    setPlayer(data.player);
                    setIsFighting(false);
                    
                    
                    setMessage((prev) => ({
                        message: [
                            ...(prev?.message ?? []),
                            `You defeated ${data.enemy.name} the ${data.enemy.type.species}`,
                        ],
                    }));

                    setTimeout(() => {
                        setMode('idle');
                    }, 1000)
                    return
                }
                enemyAttack();
                 if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
    }
            } catch (error) {
                console.error(error);
            }
	}

	async function enemyAttack() {
		const response = await fetch(`${API_URL}fight/enemyAttack`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		console.log(data);
		setPlayer(data.player);
         if (data.player.health <= 1) {
        setIsFighting(false);

        setMessage(prev => ({
            message: [...(prev?.message ?? []), "You were defeated…"]
        }));

        setTimeout(() => setMode("idle"), 1500);
        return;
    }
	}

	return (
		<>
			{isFighting === false && (
				<button onClick={() => startFight()}>Start Fight</button>
			)}
			{enemy && enemyHealth > 0 && (
				<>
					<p>
						{enemy.name} the {enemy.type.species}
					</p>
					<p>{enemyHealth}</p>

					<button onClick={() => attack()}>Attack</button>
				</>
			)}
		</>
	);
}

export default Fight;
