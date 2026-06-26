const API_URL = import.meta.env.VITE_API_URL;
import { useState, useContext } from 'react';
import { PlayerContext } from './context/playerContext';

import type { isFight } from './explore';

import type { ModeProps } from './explore';
function Fight({ setMode, setMessage, setMiniMessage}: ModeProps) {
	const {   setPlayer } = useContext(PlayerContext);
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
				

				setMessage((prev) => ({
					message: [
						...(prev?.message ?? []),
						`You defeated ${data.enemy.name} the ${data.enemy.type.species}`,
					],
				}));
				setMiniMessage( {messages: [`You defeated ${data.enemy.name} the ${data.enemy.type.species}`]} )

				setTimeout(() => {

				setIsFighting(false);
					setMode('idle');
				}, 1000);
				return;
			}
			
			enemyAttack();
			
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
			setMessage((prev) => ({
				message: [...(prev?.message ?? []), 'You were defeated…'],
			}));
			setMiniMessage( {messages: ['You were defeated…']} );
			setTimeout(() => {
				setMode('idle');
			setIsFighting(false);
			}, 1000);
			
			return;
		}
	}
	
	return (
		<div className="fight">
			
				
			
			{isFighting === false  && (
				<button onClick={() => startFight()}>Start Fight</button>
			)}
			

			{enemy && enemyHealth > 0 && (
				<>
				
						<button onClick={() => attack()}>Attack</button>
					
					<p>
						{enemy.name} the {enemy.type.species}
					</p>
					<p>{enemy.name}'s Health: {enemyHealth}</p>
					
				</>
			)}
		</div>
	);
}

export default Fight;
